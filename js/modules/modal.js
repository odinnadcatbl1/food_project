function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show'); // добавить класс show, чтобы показать элемент
    modal.classList.remove('hide'); // и удалить класс hide, который нужен, чтобы скрывать элемент
    document.body.style.overflow = 'hidden'; // добавляется стиль overflow: hidden, чтобы страница не прокручивалась, когда запущено модальное окно
    if (modalTimerId) {
    clearInterval(modalTimerId); // если пользователь открыл модальное окно сам, то обнуляем таймер 
    }
}



// можно использовать и classList.toggle('show') вместо 'show' и 'hide' вместе; 
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // Работа с модальным окном (при нажатии на кнопки "Связаться с нами"):
    // добавили data-modal в HTML для кнопок и data-close для кнопки "Закрыть(крестик)";
    
    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);
          //modalCloseBtn = document.querySelector('[data-close]'); // убрали для урока 54, т.к. создаем контент динамически и крестик уже работать не будет

    // обработчик событий:
    
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId)); // обернули в callback функцию, т.к. в обработчике событий нельзя вызывать, мы должны только объявить
    });

    // добавим также закрытие модального окна по нажатию подложки (пространства вокруг)
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') { //берем дата-атрибут и, если такого нет, то будет закрываться
            closeModal(modalSelector);
        }
    });

    // добавим закрытие модального окна по нажатию Esc:
    document.addEventListener('keydown', (e) => {
        if(e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    // покажем модальное окно, когда пользователь докрутит страницу вниз:
    function showModalByScroll() {
        // pageYoffSet - сколько пикселей пользователь прокрутил вниз; scrollHeight - полная высота элемента, с учетом прокрутки
        // clientHeight - высота клиента (видимой части), если сложить pageYOffset + clientHeight, то получим полную высоту страницы
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll); // как только 1 раз он долистал и окно показалось, больше не будет
        }
    }
    
    window.addEventListener('scroll', showModalByScroll);    
}

export default modal;
export {closeModal};
export {openModal};