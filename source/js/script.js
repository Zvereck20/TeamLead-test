(function () {
  // Swiper

  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 15,

    breakpoints: {
      1024: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      }
    },

    pagination: {
      el: ".swiper-pagination",
    },
  });

  // Timer

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    return {
      'total': t,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function initializeClock(endtime) {
    const clock = document.querySelector('.special__timer');
    const minutesSpan = clock.querySelector('.special__timer-min');
    const secondsSpan = clock.querySelector('.special__timer-sec');

    function updateClock() {
      const t = getTimeRemaining(endtime);

      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
        clock.innerHTML = "Извините но Ваше время закончилось!";
        clock.style.textAlign = 'center';
        clock.style.color = '#EB1B00';
      }
    }

    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
  }

  var deadline = new Date(Date.parse(new Date()) + 30 * 60 * 1000); // for endless timer
  initializeClock(deadline);
})();
