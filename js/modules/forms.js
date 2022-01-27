import {closeModal, openModal} from './modal';
import {postData} from '../services/services';


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

            postData('http://localhost:3000/requests', json)
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
        openModal('.modal', modalTimerId);

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
            closeModal('.modal');
        }, 4000);
    }
}

export default forms;