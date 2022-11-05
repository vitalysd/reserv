const burger = document.querySelector(".burger");
const menu = document.querySelector(".nav");
// const overlay = document.querySelector(".overlay");
const link = document.querySelectorAll(".nav__link");

export const enableScroll = () => {
  const fixBlocks = document?.querySelectorAll(".fixed-block");
  const body = document.body;
  const htmlEl = document.documentElement;

  const pagePosition = parseInt(body.dataset.position, 10);
  fixBlocks.forEach((el) => {
    el.style.paddingRight = "0px";
  });
  body.style.paddingRight = "0px";

  body.style.top = "auto";
  body.classList.remove("dis-scroll");
  window.scroll({
    top: pagePosition,
    left: 0,
  });
  body.removeAttribute("data-position");
  htmlEl.style.scrollBehavior = "smooth";
};

export const disableScroll = () => {
  const fixBlocks = document?.querySelectorAll(".fixed-block");
  const pagePosition = window.scrollY;
  const body = document.body;
  const paddingOffset = `${window.innerWidth - vars.bodyEl.offsetWidth}px`;

  vars.htmlEl.style.scrollBehavior = "none";
  fixBlocks.forEach((el) => {
    el.style.paddingRight = paddingOffset;
  });
  body.style.paddingRight = paddingOffset;
  body.classList.add("dis-scroll");
  body.dataset.position = pagePosition;
  body.style.top = `-${pagePosition}px`;
};

export const toggleMenu = () => {
  burger.classList.toggle("burger--active");
  // overlay.classList.toggle("overlay--active");
  menu.classList.toggle("nav--active");
  if (burger.classList.contains("burger--active")) {
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Закрыть меню");
    // disableScroll();
    link.forEach((e) => {
      e.addEventListener("click", toggleMenu);
    });
  } else {
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Открыть меню");
    // enableScroll();
  }
};

burger.addEventListener("click", toggleMenu);
// overlay.addEventListener("click", toggleMenu);
