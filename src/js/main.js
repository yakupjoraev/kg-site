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
  const services = document.querySelector('.services-item')
  let menuItems = document.querySelectorAll('.menu__item');
  const btn = document.querySelector('.menu__services-close');
  const sublists = document.querySelector('.sublists');
  let timeoutId; // переменная для хранения идентификатора таймера

  if (!container) {
    return null;
  }

  // menuItems.forEach(menuItem => {
  //   menuItem.addEventListener('mouseover', function () {
  //     clearTimeout(timeoutId); // очистка таймера при наведении на элемент
  //     container.classList.add('show');
  //   });

  //   menuItem.addEventListener('mouseout', function () {
  //     removeActiveClassWithDelay();
  //   });
  // });

  services.addEventListener('mouseover', function () {
    clearTimeout(timeoutId); // очистка таймера при наведении на элемент
    container.classList.add('show');
  });

  services.addEventListener('mouseout', function () {
    removeActiveClassWithDelay();
  });

  if (sublists) {
    sublists.addEventListener('mouseover', function () {
      clearTimeout(timeoutId); // очистка таймера при наведении на sublists
    });

    sublists.addEventListener('mouseout', function (event) {
      const toElement = event.toElement || event.relatedTarget; // получение элемента, на который курсор перемещается

      // Проверка, находится ли курсор на menuItem или sublists и их дочерних элементах
      const isCursorOverMenuItem = Array.from(menuItems).some(menuItem =>
        menuItem.contains(toElement)
      );
      const isCursorOverSublists = sublists.contains(toElement);

      if (isCursorOverMenuItem || isCursorOverSublists) {
        return; // Если курсор все еще на menuItem или sublists, выход из функции
      }

      container.classList.remove('show');
    });

    sublists.addEventListener('click', function (event) {
      container.classList.remove('show');
      event.stopPropagation(); // предотвращение всплытия события click к родительским элементам
    });

    const sublistsItems = sublists.querySelectorAll('.sublist__item');
    sublistsItems.forEach(item => {
      item.addEventListener('click', function (event) {
        container.classList.remove('show');
        event.stopPropagation(); // предотвращение всплытия события click к родительским элементам
      });
    });
  }

  function removeActiveClassWithDelay() {
    timeoutId = setTimeout(function () {
      container.classList.remove('show');
    }, 500); // задержка в 0,5 секунды
  }

  if (btn) {
    btn.addEventListener('click', () => {
      container.classList.remove('show');
    });
  }
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
stepsAnimation()
