/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc () {
    // Калькулятор 

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }

            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        })
    }

    initLocalSettings('#gender', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.366 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }   
    }

    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');


    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            
            calcTotal();
        })

    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);
    
    

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards () {
    // Используем классы для карточек:
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) { // добавили rest-оператор
            this.src = src; // путь к изображению
            this.alt = alt; // альтернатива на случай, если изображение не прогрузилось
            this.title = title; // заголовок
            this.descr = descr; // описание
            this.price = price; // цена
            this.classes = classes;
            this.parent = document.querySelector(parentSelector); // родитель
            this.transfer = 73; // курс рубля и доллара
            this.changeToRub();
        }

        // функция конвертации в рубли
        changeToRub() {
            this.price = this.price * this.transfer;
        }

        // сформируем верстку
        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) { // проверяем на условие того, что classes не пустой
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            // скопировал из HTML
            element.innerHTML = ` 
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    // getResource('http://localhost:3000/menu')
    // .then(data => {
    //     data.forEach(({img, altimg, title, descr, price}) => { // реструктуризация объекта ({свойства объекта})
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //     });
    // });

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => { // реструктуризация объекта ({свойства объекта})
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");




function forms(formSelector, modalTimerId) {
    // Forms 
    const forms = document.querySelectorAll(formSelector);
    
    const message = {
        loading: '/icons/spinner.svg', 
        success: 'Спасибо, мы с вами свяжемся!',
        failure: 'Что-то пошло не так..'
    };

    forms.forEach(item => {
        bindPostData(item);
    })

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // отменяем стандартное поведение, чтобы не обновлялась страница при sumbit

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading//устанавливаем атрибут src
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage); 
            form.insertAdjacentElement('afterend', statusMessage); // вставка после(afterend) формы, второй аргумент - то, что нужно вставить

            // request.setRequestHeader('Content-type', 'application/json');
            // request.setRequestHeader('Content-type', 'multipart/form-data'); // второй аргумент такой - чтобы работать с объектом FormData
            // formData - специальный объект, который позволяет собрать все данные, которые ввел пользователь
            const formData = new FormData(form);

            // const object = {};
            // formData.forEach(function(value, key) {
            //     object[key] = value;
            // });
            // Более новый способ преобразовать formData в JSON:
            const json = JSON.stringify(Object.fromEntries(formData.entries())); // берем formData -> превращаем в массив массивов -> превращаем в классический объект(fromEntries) -> превращаем классический объект в JSON

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset(); // сброс формы;
            });

        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            prevModalDialog.classList.add('show');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, inner}) {
    //SLIDER
    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesInner = document.querySelector(inner),
          width = window.getComputedStyle(slidesWrapper).width; // получаем ширину из всех примененных стилей
    let slideIndex = 1; // индекс данного слайда
    let offset = 0;

        // Первый вариант (легкий)

    // showSlides(slideIndex);
    
    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.style.display = 'none');
    //     slides[slideIndex - 1].style.display = 'block';

    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });


        // Второй вариант
    
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }


    slidesInner.style.width = 100 * slides.length + '%';
    slidesInner.style.display = 'flex';
    slidesInner.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const dots = document.createElement('ol'),
          dotsMassive = [];
    dots.classList.add('carousel-indicators');
    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i == 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot);
        dotsMassive.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }
    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) { // используем регулярные выражения, чтобы избавиться от "px"
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesInner.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dotsMassive.forEach(dot => dot.style.opacity = '0.5');
        dotsMassive[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1)
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesInner.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dotsMassive.forEach(dot => dot.style.opacity = '0.5');
        dotsMassive[slideIndex - 1].style.opacity = 1;
    });

    dotsMassive.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length -2) * (slideTo - 1);
            slidesInner.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dotsMassive.forEach(dot => dot.style.opacity = '0.5');
            dotsMassive[slideIndex - 1].style.opacity = 1;

        })
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // Tabs
    const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);

    // скрываем все ненужные табы:
    function hideTabContent() {
        tabsContent.forEach(item => {
        // заменили на класс, который ввели в style.css    item.style.display = 'none'; 
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        // удалим класс активности у табов
        tabs.forEach(item => {
            item.classList.remove(activeClass); // точка не ставится, потому что мы и так работаем с классами
        });
    }

    // создадим функцию, которая наоборот будет показывать нужные табы;
    function showTabContent(i = 0) {
    // заменили на класс, который ввели в style.css    tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    // Используем делегирование событий и назначим обработчик событий:
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) { // если элемент, на который мы кликнули совпал во время перебора, то сделать:
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
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
    
    setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
// оборачиваем обращение к серверу в функцию, используя перевод из асинхронного кода в синхронный
//async/await - парные операторы, всегда используются вместе
const postData = async (url, data) => { // async - говорим, что внутри функции будет асинхронный код
    const result = await fetch(url, { // await - перед операциями, которые необходимо дождаться
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: data
    });

    return await result.json(); // дожидаемся перевода в обычный объект и только потом return
};

const getResource = async (url) => { // async - говорим, что внутри функции будет асинхронный код
    const result = await fetch(url);  // await - перед операциями, которые необходимо дождаться

    // свойство ok - говорит, что всё сработало нормально; status - код статуса
    if (!result.ok) {
        // объект ошибки
        throw new Error(`Could not fetch ${url}, status: ${result.status}`); // выкидываем новую ошибку
    }

    return await result.json(); // дожидаемся перевода в обычный объект и только потом return
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");









window.addEventListener('DOMContentLoaded', () => {
    
    // сделаем так, чтобы модальное окно появлялось через определенное время:
    
    const modalTimerId = setTimeout(()=> (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 50000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        inner: '.offer__slider-inner',
    });
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2022-02-10');
});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map