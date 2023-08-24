// Custom scripts
// Мобильное меню бургер
function burgerMenu() {
  const burger = document.querySelector('.burger')
  const menu = document.querySelector('.menu')
  const body = document.querySelector('body')
  burger.addEventListener('click', () => {
    if (!menu.classList.contains('active')) {
      menu.classList.add('active')
      burger.classList.add('active-burger')
      body.classList.add('locked')
    } else {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
  //снять классы при клике на элементы меню
  const menuItems = document.querySelectorAll('.menu__item')

  menuItems.forEach(item => {
    item.addEventListener('click', function () {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    })
  });

  // Вот тут мы ставим брейкпоинт навбара
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991.98) {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
}
burgerMenu()



function casesSlider() {
  var swiper = new Swiper(".cases__slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".cases__slider-next",
      prevEl: ".cases__slider-prev",
    },

    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1.2,
        spaceBetween: 16
      },
      // when window width is >= 480px
      767: {
        slidesPerView: 2,
        spaceBetween: 16
      },
      // when window width is >= 640px
      1200: {
        slidesPerView: 3,
        spaceBetween: 16,
      }
    }
  });
}

casesSlider();

function casesPageSlider() {
  const container = document.querySelector('.cases-page');

  if (!container) {
    return null
  }

  var swiper = new Swiper(".cases-page__slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".cases-page__slider-next",
      prevEl: ".cases-page__slider-prev",
    },
  });
}

casesPageSlider();

function developmentExamplestSlider() {
  const container = document.querySelector('.development-examples__block-slides');

  if (!container) {
    return null
  }

  var swiper = new Swiper(".development-examples__block-slides .cases-page__slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".development-examples__block-slides .cases-page__slider-next",
      prevEl: ".development-examples__block-slides .cases-page__slider-prev",
    },
  });
}

developmentExamplestSlider();


// /** * custom
//  * @returns {null} */
// function developmentExamplestSlider() {
//   const container = document.querySelectorAll('.development-examples__block-slides');
//   if (!container) {
//     return null
//   }
//   container.forEach((elem) => {
//     var id = elem.dataset.id
//     new Swiper(".development-examples__block-slides .cases-page__slider-" + id, {
//       slidesPerView: 1, spaceBetween: 20,
//       navigation: {
//         nextEl: ".development-examples__block-slides .cases-page__slider-next-" + id,
//         prevEl: ".development-examples__block-slides .cases-page__slider-prev-" + id,
//       },
//     });
//   })
// }
// developmentExamplestSlider();

function tabs(headerSelector, tabSelector, contentSelector, activeClass, display = 'flex') {
  const headers = document.querySelectorAll(headerSelector);

  headers.forEach(header => {
    const tabs = header.querySelectorAll(tabSelector),
      contents = header.parentElement.querySelectorAll(contentSelector);

    function hideTabContent() {
      contents.forEach(item => {
        item.style.display = 'none';
      });
      tabs.forEach(item => {
        item.classList.remove(activeClass);
      });
    }

    function showTabContent(i = 0) {
      contents[i].style.display = display;
      tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    header.addEventListener('click', e => {
      const target = e.target;
      if (target.classList.contains(tabSelector.replace(/\./, '')) ||
        target.parentNode.classList.contains(tabSelector.replace(/\./, ''))) {
        tabs.forEach((item, i) => {
          if (target == item || target.parentNode == item) {
            hideTabContent();
            showTabContent(i);
          }
        });
      }
    });
  });
}

// Usage example:
tabs('.tabs__header', '.tabs__header-item', '.tabs__content-item', 'active');


function container() {
  const container = document.querySelector('.header');
  const services = document.querySelector('.services-item');
  const sublists = document.querySelector('.sublists');

  if (!container) {
    return null;
  }

  services.addEventListener('click', (event) => {
    event.preventDefault(); // Отмена стандартного перехода по ссылке
    container.classList.remove('contacts-item');
    container.classList.toggle('show');
  });

  // Добавить обработчик события клика на весь документ
  document.addEventListener('click', (event) => {
    // Проверить, является ли целевой элемент клика частью контейнера или его дочерним элементом
    if (!container.contains(event.target)) {
      container.classList.remove('show'); // Удалить класс "show" у контейнера
      // Удалить класс "show" у дочерних элементов контейнера (если необходимо)
      // Например, если sublists является дочерним элементом контейнера, то:
      // sublists.classList.remove('show');
    }
  });
}

if (window.matchMedia("(min-width: 1200px)").matches) {
  container();
}




function contactsBlock() {
  const container = document.querySelector('.header');
  const contacts = document.querySelector('.contacts-item');

  if (!container || !contacts) {
    return null;
  }

  contacts.addEventListener('click', (event) => {
    event.preventDefault(); // Отмена стандартного перехода по ссылке
    container.classList.remove('show');
    container.classList.toggle('contacts-item');
  });

  let touchStartY; // Переменная для хранения начальной точки касания по Y
  const swipeThreshold = 50; // Минимальная дистанция свайпа для активации

  // Добавить обработчик события touchstart для определения начальной точки касания
  document.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0].clientY;
  });

  // Добавить обработчик события touchmove для определения свайпа
  document.addEventListener('touchmove', (event) => {
    event.preventDefault(); // Предотвратить скроллинг при свайпе
  });

  // Добавить обработчик события touchend для определения окончания свайпа
  document.addEventListener('touchend', (event) => {
    if (!touchStartY) return; // Убедимся, что touchstart был вызван до этого

    const touchEndY = event.changedTouches[0].clientY;

    // Вычисляем вертикальное расстояние свайпа
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaY) > swipeThreshold) {
      if (deltaY > 0) {
        // Свайп вниз, убрать класс "contacts-item"
        container.classList.remove('contacts-item');
      } else {
        // Свайп вверх, убрать класс "contacts-item"
        container.classList.remove('contacts-item');
      }
    }

    // Сбросим touchStartY, чтобы не повлиять на следующий свайп
    touchStartY = null;
  });
}

contactsBlock();



function stepsAnimation() {
  const container = document.querySelector('.steps')

  if (!container) {
    return null
  }

  AOS.init();
}
stepsAnimation();

// Аккордеон
const accordionItems = document.querySelectorAll('[data-accordion-item]');
let openAccordion = null; // переменная для хранения ссылки на открытый аккордеон

function toggleAccordion() {
  if (openAccordion && openAccordion !== this) {
    // Если есть открытый аккордеон, который не совпадает с текущим
    openAccordion.classList.remove('active'); // закрыть его
    const openAccordionContent = openAccordion.nextElementSibling;
    if (openAccordionContent) {
      // если у аккордеона есть содержимое
      openAccordionContent.style.maxHeight = null; // сбросить высоту контента
    }
  }

  this.classList.toggle('active'); // открыть или закрыть текущий аккордеон

  const content = this.nextElementSibling;
  if (content) {
    // если у аккордеона есть содержимое
    if (content.style.maxHeight) {
      // Если контент открыт, закрыть его
      content.style.maxHeight = null;
    } else {
      // Если контент закрыт, открыть его
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }

  openAccordion = this; // запомнить ссылку на открытый аккордеон
}

// Активация первого [data-accordion-item] по умолчанию
const firstAccordionItem = accordionItems[0]; // Получение первого элемента аккордеона
if (firstAccordionItem) {
  firstAccordionItem.classList.add('active'); // Добавление класса "active" для активации элемента
  const content = firstAccordionItem.nextElementSibling; // Получение содержимого элемента
  if (content) {
    content.style.maxHeight = content.scrollHeight + 'px'; // Открытие содержимого
  }
  openAccordion = firstAccordionItem; // Обновление ссылки на открытый аккордеон
}

accordionItems.forEach(item => item.addEventListener('click', toggleAccordion));









function faqList() {
  const list = document.querySelector('[data-faq-list]');

  if (!list) {
    return null
  }

  let listItems = document.querySelectorAll('[data-faq-item]');

  listItems.forEach(listItem => {
    listItem.addEventListener('click', () => {
      listItem.classList.toggle('active')
    })
  });
}

faqList();


function videosAll() {
  const videosContainer = document.querySelector('[data-youtube-videos]');

  if (!videosContainer) {
    return null
  }

  const videosBtnAll = document.querySelector('[data-youtube-videos-btn]')

  videosBtnAll.addEventListener('click', () => {
    videosContainer.classList.toggle('show')
  })
}

videosAll();


function auditSticky() {
  const container = document.querySelector('.audit__steps');

  if (!container) {
    return null
  }

  // Получаем элементы списка шагов
  const stepsItems = document.querySelectorAll('.audit__steps-item');

  // Получаем элемент aside
  const aside = document.querySelector('.audit__steps-aside');

  // Функция, которая будет вызываться при скролле
  function handleScroll() {
    // Получаем верхний отступ aside
    const asideTop = aside.getBoundingClientRect().top;

    // Находим текущий активный шаг
    let activeStep = null;
    stepsItems.forEach((item, index) => {
      const itemTop = item.getBoundingClientRect().top;
      if (itemTop <= asideTop) {
        activeStep = item;
      }
    });

    // Удаляем класс active у всех элементов списка
    stepsItems.forEach((item) => item.classList.remove('active'));

    // Добавляем класс active текущему активному шагу
    if (activeStep) {
      activeStep.classList.add('active');
    }
  }

  // Добавляем обработчик события скролла
  window.addEventListener('scroll', handleScroll);

  // Запускаем функцию при загрузке страницы, чтобы применить начальное состояние
  handleScroll();

}

auditSticky();




