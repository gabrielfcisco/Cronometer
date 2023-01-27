const display = document.getElementById('display');
const btnStart = document.getElementById('btn-start');
const btnStop = document.getElementById('btn-stop');
const btnRestart = document.getElementById('btn-restart');
let hours = 0, minutes = 0, seconds = 0;
let interval;

const formatterTime = (hours, minutes, seconds) => {
    const hoursValue = hours < 10 ? '0' + hours : hours;
    const minutesValue = minutes < 10 ? '0' + minutes : minutes;
    const secondsValue = seconds < 10 ? '0' + seconds : seconds;
    display.textContent = hoursValue + ":" + minutesValue + ":" + secondsValue
}

const startTime = (startValue) => {
    btnStart.setAttribute("disabled", "true");
    btnStop.removeAttribute("disabled");
    btnRestart.removeAttribute("disabled");

    if (startValue == "start") {
        hours = minutes = seconds = 0;
        interval = setInterval(() => {
            seconds++;
            if (seconds == 60) {
                minutes++;
                seconds = 0;
            }

            if (minutes == 60) {
                hours++;
                minutes = 0;
            }

            formatterTime(hours, minutes, seconds);
        }, 1000);
    } else if (startValue == "continue") {
        interval = setInterval(() => {
            seconds++;
            if (seconds == 60) {
                minutes++;
                seconds = 0;
            }

            if (minutes == 60) {
                hours++;
                minutes = 0;
            }

            formatterTime(hours, minutes, seconds);
        }, 1000);
    }

}

const pauseTime = (interval) => {
    clearInterval(interval);
}

btnStart.addEventListener("click", () => {
    const startValue = btnStart.getAttribute("data-start");
    startTime(startValue);
});

btnStop.addEventListener("click", () => {
    btnStop.setAttribute("disabled", "true");
    btnStart.textContent = "Continue";
    btnStart.removeAttribute("disabled");
    btnStart.setAttribute("data-start", "continue");
    pauseTime(interval);
});

btnRestart.addEventListener("click", () => {
    pauseTime(interval);
    display.textContent = "00:00:00";
    btnStart.removeAttribute("disabled");
    btnStart.setAttribute("data-start", "start");
    btnStart.textContent = "Start";
    btnStop.setAttribute("disabled", "true");
    btnRestart.setAttribute("disabled", "true");
});

