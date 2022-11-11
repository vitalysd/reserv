import "./functions/throttle";
import "./functions/burger";
import "./functions/validate-forms";

import axios from "axios";

import SmoothScroll from "smooth-scroll";
const scroll = new SmoothScroll('a[href*="#"]');

////////TEXT-MORE///////////////////////////////////////////////////////////
const textMoreBtn = document.querySelector(".feedback-item__more-btn");
const moreText = document.querySelector(".feedback-item__more-text");
const dots = document.querySelector(".feedback-item__dots");

textMoreBtn.addEventListener("click", (e) => {
  moreText.classList.toggle("feedback-item__more-text--active");
  dots.classList.toggle("feedback-item__dots--active");
  moreText.classList.contains("feedback-item__more-text--active")
    ? (textMoreBtn.innerHTML = "Скрыть текст")
    : (textMoreBtn.innerHTML = "Читать полностью");
});

//////////YANDEX-MAP//////////////////////////////////////////////////
let center = [56.060152, 92.958456];

function init() {
  let map = new ymaps.Map("map", {
    center: center,
    left: center,
    zoom: 17,
  });

  let placemark = new ymaps.Placemark(
    center,
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png",
      iconImageSize: [60, 60],
      iconImageOffset: [-50, -90],
    }
  );

  map.controls.remove("geolocationControl"); // удаляем геолокацию
  map.controls.remove("searchControl"); // удаляем поиск
  map.controls.remove("trafficControl"); // удаляем контроль трафика
  map.controls.remove("typeSelector"); // удаляем тип
  map.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
  map.controls.remove("zoomControl"); // удаляем контрол зуммирования
  map.controls.remove("rulerControl"); // удаляем контрол правил
  // map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

  map.geoObjects.add(placemark);
}

ymaps.ready(init);

/////////////////MODAL-FORM////////////////////////////
function bindModal(trigger, modal, close) {
  (trigger = document.querySelectorAll(trigger)),
    (modal = document.querySelector(modal)),
    (close = document.querySelector(close));
  trigger.forEach((i) => {
    i.addEventListener("click", (e) => {
      e.preventDefault();
      modal.style.display = "flex";
    });
  });
  close.addEventListener("click", () => {
    modal.style.display = "none";
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}

bindModal(".modal-btn", ".modal__wrapper", ".modal__close");

//////FIXED///////////////////////////////////////////////////////
const header = document.querySelector(".header");
const hero = document.querySelector(".hero");
const heroHeight = hero.offsetHeight;
const headerHeight = header.offsetHeight;

window.addEventListener("scroll", () => {
  let scrollDistance = window.scrollY;
  if (scrollDistance >= heroHeight) {
    header.classList.add("fixed");
    hero.style.marginTop = `${headerHeight}px`;
  } else {
    header.classList.remove("fixed");
    hero.style.marginTop = null;
  }
});

///////////////CAUNTERS//////////////////
let nums = document.querySelectorAll(".hero__progress-number");
let interval = 2000;

nums.forEach((num) => {
  let startNum = 0;
  let endNum = parseInt(num.getAttribute("data-val"));
  let duration = Math.round(interval / endNum);
  if (endNum < 1000) {
    let counter = setInterval(function () {
      startNum += 1;
      num.textContent = startNum;
      if (startNum == endNum) {
        clearInterval(counter);
      }
    }, duration);
  } else {
    let counter = setInterval(function () {
      startNum += 20;
      num.textContent = startNum;
      if (startNum > endNum) {
        clearInterval(counter);
      }
    }, 1);
  }
});

/////////////////SEND-MESSAGE////////////////////////

const TOKEN = "5693875023:AAHJ3oxqekMcYDdQH7a5IS2taX5G__5tt4M";
const CHAT_ID = "-1001722979024";
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

const forms = document.querySelectorAll(".form");
const formStatus = document.querySelectorAll(".status-form");
const formSend = document.querySelectorAll(".form-send");

forms.forEach((i) => {
  i.addEventListener("submit", function (e) {
    e.preventDefault();

    let message = `<b>Заявка с сайта!</b>\n`;
    message += `<b>Отправитель:</b> ${this.name.value} \n`;
    message += `<b>Номер телефона:</b> ${this.phone.value} \n`;
    message += `<b>Сообщение:</b> ${this.text.value} \n`;

    axios
      .post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: "html",
        text: message,
      })
      .then((res) => {
        formSend.forEach((i) => {
          i.style.display = "none";
        });
        formStatus.forEach((i) => {
          i.innerHTML = "Спасибо! Мы вам перезвоним!";
        });
        this.name.value = "";
        this.phone.value = "";
        this.text.value = "";
      })
      .catch((err) => {})
      .finally(() => {});
  });
});
