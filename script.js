'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector(".header");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector('#section--1');
// Tabbed Component Build
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const openModal = function(e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener("click", (e) => {
  const s1coords = section1.getBoundingClientRect(); //gets coordinates
  // Old School Way
  // moves to the absolute position (current pos + current scroll)
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth"
  // });

  // Modern Way
  section1.scrollIntoView({ behavior: "smooth" });
});

// Page Navigation
//////////////// Event Delegation (!Important)
// 1. Add event listener to a common parent element
// 2. Determine which element organized the event
document.querySelector(".nav__links").addEventListener("click", function(e) {
  e.preventDefault();
  //Matching Strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});


// using event delegation (attach event handler on parent)
tabsContainer.addEventListener("click", function(e) {
  const clicked = e.target.closest(".operations__tab");
  if (!clicked) return; // Guard Clause

  // Remove previously active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate current Tab
  clicked.classList.add("operations__tab--active");
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");
})



/*
// creating and inserting elements
const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML = `We use cookies to improve functionality and analytics. <button class="btn btn--close-cookie">Got It!</button>`;

header.append(message);
// deleting elements
document.querySelector(".btn--close-cookie")
  .addEventListener("click", () => message.remove());

//inline styling elements
message.style.backgroundColor = "#37383d";
message.style.width = "120%";
// to get CSS characteristics added by a browser/DOM => getComputedStyle(element).attribute
console.log("Getting the height set by a browser", getComputedStyle(message).height);
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

document.documentElement.style.setProperty("--color-primary", "orangered");

// Attributes (standard properties)
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
logo.alt = "Changed Alt Text";
console.log(logo.alt);

console.log(logo.src); //absolute url
console.log(logo.getAttribute("src")); //relative url

// Data Attributes (if you need to store data in UI)
console.log("data attribute from image: ", logo.dataset.versionNumber);
*/
