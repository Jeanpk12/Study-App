const taskInput = document.querySelector('#new-task input');
const addTaskButton = document.querySelector('#push');
const tasksContainer = document.querySelector('#tasks');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const workTitle = document.getElementById('foco');
const breakTitle = document.getElementById('break');
const startButton = document.getElementById('start');
const restartButton = document.getElementById('restart');

function createTaskElement(taskText) {
    const taskContainer = document.createElement('div');
    taskContainer.className = 'task';
    const taskName = document.createElement('span');
    taskName.className = 'task-name';
    taskName.textContent = taskText;
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.innerHTML = '<i class="ri-delete-bin-7-line"></i>';
    taskContainer.appendChild(taskName);
    taskContainer.appendChild(deleteButton);
    taskContainer.addEventListener('click', (event) => {
        if (!event.target.closest('.delete')) {
            taskName.classList.toggle('completed');
            taskContainer.classList.toggle('completed-container');
        }
    });
    deleteButton.addEventListener('click', (event) => {
        event.stopPropagation();
        taskContainer.remove();
    });
    return taskContainer;
}

function handleAddTask() {
    const taskText = taskInput.value.trim();
    if (taskText.length === 0) {
        alert("Você precisa adicionar uma matéria para estudar");
        return;
    }
    const newTask = createTaskElement(taskText);
    tasksContainer.appendChild(newTask);
    taskInput.value = '';
    taskInput.focus();
}
addTaskButton.addEventListener('click', handleAddTask);
taskInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        handleAddTask();
    }
});

const WORK_TIME_MINUTES = 25;
const BREAK_TIME_MINUTES = 5;

let timerInterval = null;
let currentMinutes = WORK_TIME_MINUTES;
let currentSeconds = 0;
let isBreak = false;
let isPaused = true;

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function updateDisplay() {
    minutesDisplay.textContent = formatTime(currentMinutes);
    secondsDisplay.textContent = formatTime(currentSeconds);
}

function updateTitles() {
    if (isBreak) {
        workTitle.classList.remove('active');
        breakTitle.classList.add('active');
    } else {
        workTitle.classList.add('active');
        breakTitle.classList.remove('active');
    }
}

function setTimerMode(switchToBreak) {
    clearInterval(timerInterval);
    timerInterval = null;
    isPaused = true;
    isBreak = switchToBreak;
    currentMinutes = isBreak ? BREAK_TIME_MINUTES : WORK_TIME_MINUTES;
    currentSeconds = 0;
    updateDisplay();
    updateTitles();
    startButton.style.display = "block";
    restartButton.style.display = "none";
}

function tick() {
    if (isPaused) return;
    if (currentSeconds > 0) {
        currentSeconds--;
    } else {
        if (currentMinutes > 0) {
            currentMinutes--;
            currentSeconds = 59;
        } else {
            isBreak = !isBreak;
            currentMinutes = isBreak ? BREAK_TIME_MINUTES : WORK_TIME_MINUTES;
            currentSeconds = 0;
            updateTitles();
            if (currentMinutes > 0) {
                currentMinutes--;
                currentSeconds = 59;
            } else {
                currentSeconds = 0;
            }
        }
    }
    updateDisplay();
}

function startTimer() {
    if (!isPaused) return;
    isPaused = false;
    startButton.style.display = "none";
    restartButton.style.display = "block";
    clearInterval(timerInterval);
    updateTitles();
    updateDisplay();
    if (currentSeconds === 0 && currentMinutes > 0) {
        currentMinutes--;
        currentSeconds = 59;
        updateDisplay();
    } else if (currentMinutes === 0 && currentSeconds === 0) {
        isPaused = true;
        startButton.style.display = "block";
        restartButton.style.display = "none";
        console.warn("Timer em 00:00 não pode ser iniciado.");
        return;
    }
    timerInterval = setInterval(tick, 1000);
}

function resetTimer() {
    setTimerMode(false);
}

startButton.addEventListener('click', startTimer);
restartButton.addEventListener('click', resetTimer);

workTitle.addEventListener('click', () => {
    if (isBreak || currentMinutes !== WORK_TIME_MINUTES || currentSeconds !== 0) {
         setTimerMode(false);
    }
});

breakTitle.addEventListener('click', () => {
    if (!isBreak || currentMinutes !== BREAK_TIME_MINUTES || currentSeconds !== 0) {
        setTimerMode(true);
    }
});

window.addEventListener('load', () => {
    resetTimer();
});
