import { data, loadGifts, createGiftCard } from "./gifts-data.js";
import { createModal } from "./modal.js";

const rightArrow = document.querySelector('.rightArrow');
const leftArrow = document.querySelector('.leftArrow');
const sliderRow = document.querySelector('.sliderRow');
const wrapper = document.querySelector('.slider .wrapper');
const container = document.querySelector('.gifts');

const days = document.querySelector('.days .count');
const hours = document.querySelector('.hours .count');
const minutes = document.querySelector('.minutes .count');
const seconds = document.querySelector('.seconds .count');

let screenWidth = window.innerWidth;
let style = getComputedStyle(wrapper);
let styleRow = getComputedStyle(sliderRow);
let visibleField = Math.round(parseFloat(style.width) + parseFloat(style.marginRight) + 8);
let widthRow = Math.round(parseFloat(styleRow.width));
let changeField = widthRow - visibleField;
let step = Number((changeField / 3).toFixed(1));
let thinkStep = Number((changeField / 6).toFixed(1));
let offset = 0;
let newScreenWidth;

window.addEventListener('resize', handleResize);
rightArrow.addEventListener('click', showNextSlide);
leftArrow.addEventListener('click', showPrevSlide);

function handleResize() {
    newScreenWidth = window.innerWidth;

    if (newScreenWidth !== screenWidth) {
        sliderRow.style.left = '0px';

        offset = 0;
        screenWidth = newScreenWidth;

        style = getComputedStyle(wrapper);
        visibleField = Math.round(parseFloat(style.width) + parseFloat(style.marginRight) + 8);
        changeField = widthRow - visibleField;

        step = Number((changeField / 3).toFixed(1));
        thinkStep = Number((changeField / 6).toFixed(1));

        leftArrow.disabled = true;
        rightArrow.disabled = false;

        leftArrow.classList.add('inactive');
        rightArrow.classList.remove('inactive');
    }
};

function showNextSlide() {
    if (!rightArrow.hasAttribute('disabled')) {
        leftArrow.disabled = false;
        leftArrow.classList.remove('inactive');

        if (screenWidth > 768) {
            offset = offset + step;
        }
        if (screenWidth <= 768) {
            offset = Number((offset).toFixed(1)) + thinkStep;
        }
        if (Math.round(offset) <= changeField) {
            sliderRow.style.left = -offset + 'px';
        }
        if (Math.round(offset) >= changeField) {
            rightArrow.classList.add('inactive');
            rightArrow.disabled = true;
        }
    }
};

function showPrevSlide() {
    if (!leftArrow.hasAttribute('disabled')) {
        rightArrow.classList.remove('inactive');
        rightArrow.disabled = false;
        
        if (screenWidth > 768) {
            offset = Number((offset).toFixed(1)) - step;
        }
        if (screenWidth <= 768) {
            offset = Number((offset).toFixed(1)) - thinkStep;
        }
        if (Math.round(offset) >= 0) {
            sliderRow.style.left = -offset + 'px';
        }
        if (Math.round(offset) <= 0) {
            leftArrow.classList.add('inactive');
            leftArrow.disabled = true;
        }

    }
};

loadGifts('gifts.json').then(() => {
    randomCards();
});

function randomCards() {
    container.innerHTML = '';

    for (let i = 0; i < 4; i++) {
        let random = Math.floor(Math.random() * data.length);
        createGiftCard(data[random], container, 'images/')
    }
};

container.addEventListener('click', (event) => {
    const card = event.target.closest('.presentItem');
    if (!card) return;

    const giftData = data.find(el => el.name === card.id);
    if (giftData) createModal(giftData, 'images/');
});


const yearNow = new Date().getFullYear();
let deadline = Date.UTC(yearNow + 1, 0, 1, 0, 0, 0, 0);

setInterval(() => {
    let now = Date.now();
    let gap = deadline - now;

    const second = Math.floor((gap / 1000) % 60);
    const minute = Math.floor((gap / 1000 / 60) % 60);
    const hour = Math.floor((gap / (1000 * 60 * 60)) % 24);
    const day = Math.floor(gap / (1000 * 60 * 60 * 24));

    seconds.textContent = second;
    minutes.textContent = minute;
    hours.textContent = hour;
    days.textContent = day;
}, 1000);
