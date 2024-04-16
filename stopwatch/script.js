document.addEventListener('DOMContentLoaded', () => {
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
    const errorHours = document.getElementById('errorHours');
    const errorMinutes = document.getElementById('errorMinutes');
    const errorSeconds = document.getElementById('errorSeconds');
    const startBtn = document.getElementById('startBtn');
    const clearBtn = document.getElementById('clearBtn');

    let intervalId;

    hoursInput.addEventListener('input', () => validateTime(hoursInput, errorHours, 23));
    minutesInput.addEventListener('input', () => validateTime(minutesInput, errorMinutes, 59));
    secondsInput.addEventListener('input', () => validateTime(secondsInput, errorSeconds, 59));

    function validateTime(input, errorDisplay, max) {
        const value = parseInt(input.value);
        if (isNaN(value) || value < 0 || value > max) {
            errorDisplay.textContent = `Ingrese un valor entre 0 y ${max}.`;
            input.value = '';
        } else {
            errorDisplay.textContent = '';
        }
    }

    startBtn.addEventListener('click', () => {
        let totalSeconds = parseInt(hoursInput.value) * 3600 + parseInt(minutesInput.value) * 60 + parseInt(secondsInput.value);

        intervalId = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(intervalId);
                alert('Tiempo finalizado');
                return;
            }

            totalSeconds--;
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            hoursInput.value = hours;
            minutesInput.value = minutes;
            secondsInput.value = seconds;
        }, 1000);
    });

    clearBtn.addEventListener('click', () => {
        clearInterval(intervalId);
        hoursInput.value = '';
        minutesInput.value = '';
        secondsInput.value = '';
    });
});