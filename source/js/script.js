(function () {
  // Swiper

  const swiper1 = new Swiper(".mySwiper1", {
    slidesPerView: 1,
    simulateTouch: false,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const swiper2 = new Swiper(".mySwiper2", {
    slidesPerView: 3,
    spaceBetween: 15,

    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
    },

    pagination: {
      el: ".swiper-pagination",
    },
  });

  // Modal window

  const body = document.querySelector('.body');
  const modal = document.querySelector('.modal');
  const openForm = document.querySelectorAll('.button--open')
  const closeModalButton = modal.querySelector('.modal__close');

  const customerModal = document.querySelector('.customer-form');
  const feedbackForm = document.querySelector('.customer-form__field')
  const sendForm = document.querySelector('.send-form');


  function existVerticalScroll() {
    return document.body.offsetHeight > window.innerHeight
  };

  function getBodyScrollTop() {
    return self.pageYOffset || (document.documentElement && document.documentElement.ScrollTop) || (document.body && document.body.scrollTop);
  };


  openForm.forEach((el) => {
    el.addEventListener('click', e => {
      e.preventDefault();

      // body.dataset.scrollY = getBodyScrollTop();

      modal.classList.remove('visually-hidden');
      customerModal.classList.remove('visually-hidden');

      // if (existVerticalScroll()) {
      //   body.classList.add('body-lock')
      //   body.style.top = `-${body.dataset.scrollY}px`
      // };
    })
  })

  // console.log(openDrinks);

  closeModalButton.addEventListener('click', (e) => {
    e.preventDefault();

    modal.classList.add('visually-hidden');
    customerModal.classList.add('visually-hidden');

    // if (existVerticalScroll()) {
    //   body.classList.remove('body-lock')
    //   window.scrollTo(0, body.dataset.scrollY)
    // };
  })


  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      // if (!modal.classList.contains('visually-hidden')) {
      //   checkClass(modal);
      //   checkClass(cart);
      //   checkClass(customerModal);
      //   checkClass(drinksModal);
      // }

      modal.classList.add('visually-hidden');
      customerModal.classList.add('visually-hidden');

      // if (existVerticalScroll()) {
      //   body.classList.remove('body-lock')
      //   window.scrollTo(0, body.dataset.scrollY)
      // }
    };
  });

  modal.addEventListener('click', (evt) => {
    if (evt.target === modal) {
      modal.classList.add('visually-hidden');
      customerModal.classList.add('visually-hidden');
    }

    // if (existVerticalScroll()) {
    //   body.classList.remove('body-lock')
    //   window.scrollTo(0, body.dataset.scrollY)
    // };
  });

  async function sendData(a) {

    try {
      const response = await fetch('https://tel27.ru/send.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.parse(a) // данные могут быть 'строкой' или {объектом}!
      });
      const json = await response.json();
      console.log('Успех:', JSON.stringify(json));
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }


  feedbackForm.addEventListener('submit', (e) => {
    const name = document.querySelector('#name').value;
    const telephone = document.querySelector('#telephone').value;

    customerModal.classList.add('visually-hidden');
    sendForm.classList.remove('visually-hidden');

    let customerInf = {
      Name: name,
      Phone: telephone
    };

    const customerData = JSON.stringify(customerInf);

    sendData(customerData);

    setTimeout(() => {
      name.value = '';
      telephone.value = '';
      modal.classList.add('visually-hidden');
      sendForm.classList.add('visually-hidden');
    }, 3000);
  });

  // // Form validation

  window.addEventListener("DOMContentLoaded", function () {

    function setCursorPosition(pos, elem) {
      elem.focus();
      if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
      else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select()
      }
    };

    function mask(event) {
    var matrix = "+7 (9__) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");

      if (val.length < 10) {
        this.setCustomValidity('Номер введен не полностью');
      } else {
        this.setCustomValidity('');
      }

      if (def.length >= val.length) val = def;
      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
      });

      if (event.type == "blur") {
        if (this.value.length == 2) this.value = ""
      } else setCursorPosition(this.value.length, this)
    };

    const fields = document.querySelectorAll('input[type="tel"]');
    fields.forEach((input) => {
      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
    });
  });
})();
