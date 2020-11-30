import slides from "./slidesData.js";
// console.log(slides);

// !!!!!!!! SELECT ITEMS !!!!!!!!
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const slideContainer = document.getElementById("slide-container");
const slidePlaceholder = document.getElementById("slide-placeholder");
const dotsContainer = document.getElementById("dots-container");

const slidesLength = slides.length;

const windowWidth = window.innerWidth;

let dotCount = 0;

let dotsArray, slideArray;

// !!!!!!!! EVENT LISTENERS !!!!!!!!
prevBtn.addEventListener("click", () => {
  displaySlide(true);
});
nextBtn.addEventListener("click", () => {
  displaySlide();
});

// !!!!!!!! FUNCTION !!!!!!!!
function initialSlide() {
  let slideStatus, dotStatus;

  // ******** add slides to slideContainer **********
  const slidesConetent = slides.map((slide, index) => {
    if (index === 0) {
      slideStatus = "active";
    } else if (index === slidesLength - 1) {
      slideStatus = "last";
    } else {
      slideStatus = "next";
    }

    // *** when the device's width is wider than 800px, use big images ***
    if (windowWidth > 800) {
      return `<div class="slide ${slideStatus}">
              <div class="slide-box">
                <img src="${slide.img}" alt="image" />
                <div class="slide-text">${slide.text}</div>
              </div>
            </div>`;
      // *** when the device's width is smaller than 800px, use small images ***
    } else {
      return `<div class="slide ${slideStatus}">
              <div class="slide-box">
                <img src="${slide.img_s}" alt="image" />
                <div class="slide-text">${slide.text}</div>
              </div>
            </div>`;
    }
  });
  slideContainer.innerHTML = slidesConetent.join("");

  // ******** add the first slide to slidePlaceholder **********
  // +++ Note: because .slide's position value is set to absolute, so .slide-container's height is zero. And because of this, the .prev-btn, .next-btn and .dots-container can't be vertical aligned properly. To fix this issue, we add slidePlaceholder. +++
  // *** when the device's width is wider than 800px, use the big image ***
  if (windowWidth > 800) {
    slidePlaceholder.innerHTML = `<img src="${slides[0].img}" alt="image" />`;
    // *** when the device's width is smaller than 800px, use the small image ***
  } else {
    slidePlaceholder.innerHTML = `<img src="${slides[0].img_s}" alt="image" />`;
  }

  // ******** add dots to dotsContainer **********
  const dotsContent = slides.map((slide, index) => {
    if (index === 0) {
      dotStatus = "focus";
    } else {
      dotStatus = "";
    }
    return `<span class="dot-btn ${dotStatus}" data-id="${index}"></span>`;
  });
  dotsContainer.innerHTML = dotsContent.join("");

  // ******** add addEventListener to dots **********
  dotsArray = Array.from(document.querySelectorAll(".dot-btn"));
  // console.log(dotsArray[0]);
  dotsArray.map((dot, index) => {
    dot.addEventListener("click", displayClickedSlide);
  });

  slideArray = Array.from(document.querySelectorAll(".slide"));
  // console.log(slideArray);
}

// ******** display clicked slide (by .dot-btn) **********
function displayClickedSlide(e) {
  // console.log(e);
  e.preventDefault();
  const clickedDot = e.currentTarget;
  const clickedDotId = parseInt(clickedDot.dataset.id);

  // *** remove old .focus ***
  dotsArray.forEach((dot) => {
    dot.classList.remove("focus");
  });
  // *** add .focus ***
  clickedDot.classList.add("focus");

  // *** remove old .next, .active & .last ***
  slideArray.forEach((slide) => {
    slide.classList.remove("next");
    slide.classList.remove("active");
    slide.classList.remove("last");
  });

  // *** add .next, .active & .last ***
  // +++ update dotCount +++
  dotCount = clickedDotId;

  // +++ set lastDoId to the previous number +++
  let lastDotId = clickedDotId - 1;
  // +++ when first dot is clicked, set lastDoId to the last number +++
  if (clickedDotId === 0) {
    lastDotId = slideArray.length - 1;
  }

  slideArray.forEach((slide, index) => {
    if (index === clickedDotId) {
      slide.classList.add("active");
    } else if (index === lastDotId) {
      slide.classList.add("last");
    } else {
      slide.classList.add("next");
    }
  });
}

// ******** display slide (by .prev-btn & .next-btn) **********
function displaySlide(prev) {
  const active = document.querySelector(".active");
  let next = active.nextElementSibling;
  const last = document.querySelector(".last");

  // ******** for prevBtn **********
  if (prev) {
    next = last.previousElementSibling;

    // +++ when finished a slide circle, reset next +++
    if (!next) {
      next = slideContainer.lastElementChild;
    }
    // console.log(next);

    active.classList.add("next");
    next.classList.add("last");
    last.classList.add("active");
    removeClasses();
    addDotsFocus(prev);
    return;
  }

  // ******** for nextBtn **********
  // +++ when finished a slide circle, reset next +++
  if (!next) {
    next = slideContainer.firstElementChild;
    // console.log(next);
  }
  active.classList.add("last");
  next.classList.add("active");
  last.classList.add("next");
  removeClasses();
  addDotsFocus();

  // ******** remove old classes **********
  function removeClasses() {
    next.classList.remove("next");
    active.classList.remove("active");
    last.classList.remove("last");
  }

  // ******** add dots .focus **********
  function addDotsFocus(prev) {
    const dotBtnArray = document.querySelectorAll(".dot-btn");
    // *** remove old .focus ***
    dotBtnArray.forEach((dotBtn) => {
      dotBtn.classList.remove("focus");
    });

    // ******** for prevBtn **********
    if (prev) {
      dotCount--;
      if (dotCount < 0) {
        dotCount = dotBtnArray.length - 1;
      }
      // ******** for nextBtn **********
    } else {
      dotCount++;
      if (dotCount > dotBtnArray.length - 1) {
        dotCount = 0;
      }
    }

    // *** add .focus ***
    dotBtnArray[dotCount].classList.add("focus");
  }
}

initialSlide();
