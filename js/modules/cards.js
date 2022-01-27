import {getResource} from '../services/services';

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

export default cards;