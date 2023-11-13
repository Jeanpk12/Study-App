// To do list functions

function addTask() {
    if (document.querySelector('#new-task input').value.length == 0) {
        alert("Você precisa adicionar uma matéria para estudar");
    } else {
        var taskContainer = document.createElement('div');
        taskContainer.className = 'task';

        var taskName = document.createElement('span');
        taskName.id = 'taskname';
        taskName.innerText = document.querySelector('#new-task input').value;

        var deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.innerHTML = '<i class="ri-delete-bin-7-line"></i>';

        taskContainer.appendChild(taskName);
        taskContainer.appendChild(deleteButton);

        document.querySelector('#tasks').appendChild(taskContainer);

        document.querySelector('#new-task input').value = '';
        
        deleteButton.onclick = function() {
            taskContainer.remove();
        }

        taskContainer.onclick = function() {
            taskName.classList.toggle('completed');
        }
    }
}

document.querySelector('#push').onclick = addTask;

document.querySelector('#new-task input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
// To do list Functions


// Pomodoro Functions
let workTittle = document.getElementById('foco');
let breakTittle = document.getElementById('break');
let startButton = document.getElementById('start');
let restartButton = document.getElementById('restart');

let workTime = 25;
let breakTime = 5;
let seconds = "00";
let timerInterval;

window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;
    workTittle.classList.add('active');
}

function start() {
    startButton.style.display = "none";
    restartButton.style.display = "block";

    seconds = 59;

    let workMinutes = workTime - 1;
    let breakMinutes = breakTime - 1;
    let breakCount = 0;

    let timerFunction = () => {
        document.getElementById('minutes').innerHTML = workMinutes;
        document.getElementById('seconds').innerHTML = seconds;

        seconds = seconds - 1;

        if (seconds === 0) {
            workMinutes = workMinutes - 1;
            if (workMinutes === -1) {
                clearInterval(timerInterval);

                if (breakCount % 2 === 0) {
                    workMinutes = breakMinutes;
                    breakCount++;
                    workTittle.classList.remove('active');
                    breakTittle.classList.add('active');
                } else {
                    workMinutes = workTime;
                    breakCount++;
                    breakTittle.classList.remove('active');
                    workTittle.classList.add('active');
                }

                seconds = 59;

                timerInterval = setInterval(timerFunction, 1000);
            }
        }
    }

    timerInterval = setInterval(timerFunction, 1000);

    restartButton.addEventListener('click', restart);

    function restart() {
        clearInterval(timerInterval); // Clear existing timer interval
        document.getElementById('minutes').innerHTML = workTime;
        document.getElementById('seconds').innerHTML = "00";
        startButton.style.display = "block";
        restartButton.style.display = "none";
        workTittle.classList.add('active');
        breakTittle.classList.remove('active');
    }
}
// Pomodoro Functions



