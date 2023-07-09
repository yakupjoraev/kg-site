// Custom Scripts
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


// Вызываем эту функцию, если нам нужно зафиксировать меню при скролле.
function fixedNav() {
  const nav = document.querySelector('nav')

  // тут указываем в пикселях, сколько нужно проскроллить что бы наше меню стало фиксированным
  const breakpoint = 1
  if (window.scrollY >= breakpoint) {
    nav.classList.add('fixed__nav')
  } else {
    nav.classList.remove('fixed__nav')
  }
}
window.addEventListener('scroll', fixedNav)


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

function tabs(headerSelector, tabSelector, contentSelector, activeClass, display = 'flex') {
  const header = document.querySelector(headerSelector),
    tab = document.querySelectorAll(tabSelector),
    content = document.querySelectorAll(contentSelector)
  function hideTabContent() {
    content.forEach(item => {
      item.style.display = 'none'
    });
    tab.forEach(item => {
      item.classList.remove(activeClass)
    });
  }
  function showTabContent(i = 0) {
    content[i].style.display = display
    tab[i].classList.add(activeClass)
  }
  hideTabContent()
  showTabContent()
  header.addEventListener('click', e => {
    const target = e.target
    if (target.classList.contains(tabSelector.replace(/\./, '')) ||
      target.parentNode.classList.contains(tabSelector.replace(/\./, ''))) {
      tab.forEach((item, i) => {
        if (target == item || target.parentNode == item) {
          hideTabContent()
          showTabContent(i)
        }
      });
    }
  })
}

// ПЕРВЫЙ аргумент - класс всего нашего хедера табов.
// ВТОРОЙ аргумент - класс конкретного элемента, при клике на который будет переключатся таб.
// ТРЕТИЙ аргумент - класс того блока, который будет переключаться.
// ЧЕТВЕРТЫЙ аргумент - класс активности, который будет добавлятся для таба, который сейчас активен.
tabs('.tabs__header', '.tabs__header-item', '.tabs__content-item', 'active')

function container() {
  const container = document.querySelector('.header');
  const services = document.querySelector('.services-item');
  const sublists = document.querySelector('.sublists');

  if (!container) {
    return null;
  }

  services.addEventListener('click', (event) => {
    event.preventDefault(); // Отмена стандартного перехода по ссылке
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


