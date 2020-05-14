

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // Header sticky
  (function() {
    const headerBlock = document.getElementById('header');

    if (!headerBlock) return;

    toggleStateHeader();
    window.addEventListener('scroll', toggleStateHeader);

    function toggleStateHeader() {
      getScrollFromTop() >= headerBlock.offsetHeight ? headerBlock.classList.add('is-sticky') : headerBlock.classList.remove('is-sticky');
    }

    function getScrollFromTop() {
      return window.pageYOffset || document.body.scrollTop;
    }
  })();


  // Burger menu
  (function() {
    const headerMenu = document.getElementById('js-menu');
    const menuSwitcher = document.getElementById('js-burger');

    if (!menuSwitcher || !headerMenu) return;

    menuSwitcher.addEventListener('click', function() {
      this.classList.toggle('has-active');
      headerMenu.classList.toggle('has-active');
    });
  })();


  // Reserv items
  (function() {
    const roomElements = document.getElementsByClassName('room-card__link');

    for (let i = 0; i < roomElements.length; i++) {
      roomElements[i].addEventListener('click',  function(e) {
        e.preventDefault();

        let done = document.createElement('span');

        done.innerHTML = 'Забронировано'
        done.className = 'reserved';
        this.appendChild(done);
        this.classList.toggle('is-reserved');
      });
    }
  })();


  // Select fake
  (function() {
    const selectElement = document.querySelector('#my-select');

    if (!selectElement) return;

    const selectPlaceholder = document.querySelector('[data-placeholder]');
    const list = selectElement.getElementsByTagName('ul');
    const items = selectElement.getElementsByTagName('li');


    selectElement.style.width = list[0].offsetWidth + 'px';

    selectPlaceholder.addEventListener('click', function() {

        if (selectElement.classList.contains('is-opended')) {
        document.removeEventListener('click', searchClick);
      } else {
        document.addEventListener('click', searchClick);
      }
      selectElement.classList.toggle('is-opended');

    });

    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener('click', function() {
        let val = this.innerHTML;
        selectElement.classList.remove('is-opended');
        selectPlaceholder.innerHTML = val;
      })
    }


    function searchClick(e) {
      let targetElement = e.target;
      do {
        if (targetElement == selectElement) return;

        targetElement = targetElement.parentNode;
      } while (targetElement);

      document.removeEventListener('click', searchClick);
      selectElement.classList.remove('is-opended');
    }
  })();

});
