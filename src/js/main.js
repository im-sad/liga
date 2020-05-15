

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

  // Filter form
  (function() {
    const form = document.getElementById('js-filter-form');

    if (!form) return;

    const areaInputs = form.querySelectorAll('input[name="area"]');
    const featuresInputs = form.querySelectorAll('input[name="params"]');
    const roomsListItems = document.getElementById('js-rooms').getElementsByClassName('room-card');
    const formResetBtn = form.querySelector('button[type="reset"]');

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Вы всё сломали');
    });

    formResetBtn.addEventListener('click', function(e) {
      e.preventDefault();
      form.reset();
      updateContent();
    });

    areaInputs.forEach((input) => {
      input.addEventListener('input', updateContent);
    });

    featuresInputs.forEach((input) => {
      input.addEventListener('input', updateContent);
    });


    function getInputsParams(fields) {
      let params = [];

      fields.forEach((input) => {
        if (input.checked) params.push(input.value)
      });

      return params;
    }

    function toggleItemsView(items, paramsArea, paramsFeatures) {
      let isEmpryAreaParams, isEmpryFeaturesParams;

      if (paramsArea.length == 0) isEmpryAreaParams = true;
      if (paramsFeatures.length == 0) isEmpryFeaturesParams = true;

      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        let itemArea = el.dataset.area || undefined;
        let itemFeatures = el.dataset.features.split(',') || undefined;

        if (isEmpryFeaturesParams && isEmpryAreaParams) {
          el.style.display = 'block';
        } else {
          let isAreaMatch = paramsArea.indexOf(itemArea) == -1  ? false : true;
          let isFeaturesMatch = paramsFeatures.diff(itemFeatures).length ? false : true;
          let isElVisible;

          if (isAreaMatch && isEmpryFeaturesParams ||
              isFeaturesMatch && isEmpryAreaParams ||
              isAreaMatch && isFeaturesMatch
          ) {
            isElVisible = true;
          }

          isElVisible ? el.style.display = 'block' : el.style.display = 'none';
        }
      }
    }

    function updateContent() {
      const valuesArea = getInputsParams(areaInputs);
      const valuesFeatures = getInputsParams(featuresInputs);

      toggleItemsView(roomsListItems, valuesArea, valuesFeatures);
    }
  })();


  // Select fake
  (function() {
    const selectElement = document.querySelector('#my-select');
    MySelect(selectElement);
  })();

  function MySelect(el) {
    if (!el) return;

    const selectPlaceholder = document.querySelector('[data-placeholder]');
    const selectList = el.getElementsByTagName('ul');
    const selectItems = el.getElementsByTagName('li');

    el.style.width = selectList[0].offsetWidth + 'px';

    selectPlaceholder.addEventListener('click', function(e) {
      if (el.classList.contains('is-opended')) {
        document.removeEventListener('click', clickOutside);
      } else {
        document.addEventListener('click', clickOutside);
      }
      el.classList.toggle('is-opended');
    });

    for (let i = 0; i < selectItems.length; i++) {
      selectItems[i].addEventListener('click', function() {
        let content = this.innerHTML;
        el.classList.remove('is-opended');
        selectPlaceholder.innerHTML = content;
      })
    }

    function clickOutside(e) {
      let targetElement = e.target;
      do {
        if (targetElement == el) return;

        targetElement = targetElement.parentNode;
      } while (targetElement);

      document.removeEventListener('click', clickOutside);
      el.classList.remove('is-opended');
    }
  }

});


Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};
