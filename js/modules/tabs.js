function tabs() {
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
}

module.exports = tabs;