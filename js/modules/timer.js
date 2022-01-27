function timer() {
    // Timer

    const deadline = '2021-10-30';

    // функция, чтобы находить разницу времени между дедлайном и тукущим временем;
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              // floor - округление до ближайшего целого
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) %  24)), // % чтобы он не показывал больше 24 часов
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        // будем возвращать объект
        return {
            'total': t,
            'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' :seconds,
        };
    }
    
    // функция, чтобы писало не 9:9:10 осталось, а 09:09:10
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        }
        else {
            return num;
        }
    }

    // создаем функцию, которая будет устанавливать таймер на страницу:
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
                days = timer.querySelector('#days'), // в HTML у них есть id у каждого
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000); // чтобы запускать функцию updateClock каждую секунду
        
            updateClock(); // чтобы таймер не моргал при перезагрузке страницы;      
        // функция обновления таймера каждую секунду   
        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            // надо будет таймер остановить, когда время закончится
            if (t.total <= 0 ) {
                clearInterval(timeInterval);
            }
        }

    }
    
    setClock('.timer', deadline);
}

module.exports = timer;