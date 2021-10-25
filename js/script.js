window.addEventListener('DOMContentLoaded', () => {

    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    // скрываем все ненужные табы:
    function hideTabContent() {
        tabsContent.forEach(item => {
        // заменили на класс, который ввели в style.css    item.style.display = 'none'; 
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        // удалим класс активности у табов
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active'); // точка не ставится, потому что мы и так работаем с классами
        });
    }

    // создадим функцию, которая наоборот будет показывать нужные табы;
    function showTabContent(i = 0) {
    // заменили на класс, который ввели в style.css    tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    // Используем делегирование событий и назначим обработчик событий:
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) { // если элемент, на который мы кликнули совпал во время перебора, то сделать:
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

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

    // Работа с модальным окном (при нажатии на кнопки "Связаться с нами"):
    // добавили data-modal в HTML для кнопок и data-close для кнопки "Закрыть(крестик)";
    
    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

    // обработчик событий:
    function openModal() {
        modal.classList.add('show'); // добавить класс show, чтобы показать элемент
        modal.classList.remove('hide'); // и удалить класс hide, который нужен, чтобы скрывать элемент
        document.body.style.overflow = 'hidden'; // добавляется стиль overflow: hidden, чтобы страница не прокручивалась, когда запущено модальное окно
        clearInterval(modalTimerId); // если пользователь открыл модальное окно сам, то обнуляем таймер 
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });
    
    // можно использовать и classList.toggle('show') вместо 'show' и 'hide' вместе; 

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    modalCloseBtn.addEventListener('click', closeModal);

    // добавим также закрытие модального окна по нажатию подложки (пространства вокруг)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // добавим закрытие модального окна по нажатию Esc:
    document.addEventListener('keydown', (e) => {
        if(e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // сделаем так, чтобы модальное окно появлялось через определенное время:
    const modalTimerId = setTimeout(openModal, 3000);

    // покажем модальное окно, когда пользователь докрутит страницу вниз:
    function showModalByScroll() {
        // pageYoffSet - сколько пикселей пользователь прокрутил вниз; scrollHeight - полная высота элемента, с учетом прокрутки
        // clientHeight - высота клиента (видимой части), если сложить pageYOffset + clientHeight, то получим полную высоту страницы
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll); // как только 1 раз он долистал и окно показалось, больше не будет
        }
    }
    
    window.addEventListener('scroll', showModalByScroll);



});


