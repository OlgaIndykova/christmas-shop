import { createModal } from "./modal.js";
import { data, loadGifts, createGiftCard, categories } from "./gifts-data.js";

const container = document.querySelector('.container');

const btnAll = document.querySelector('.all');
const btnWork = document.querySelector('.work');
const btnHealth = document.querySelector('.health');
const btnHarmony = document.querySelector('.harmony');
const scroller = document.querySelector('.scrollToTop');

const categoryButtons = {
    all: btnAll,
    work: btnWork,
    health: btnHealth,
    harmony: btnHarmony,
};

loadGifts('../gifts.json').then(() => {
    showAll();
});

btnWork.addEventListener('click', showWork);
btnHealth.addEventListener('click', showHealth);
btnHarmony.addEventListener('click', showHarmony);
btnAll.addEventListener('click', showAll);

container.addEventListener('click', (event) => {
    const card = event.target.closest('.presentItem');
    if (!card) return;

    const giftData = data.find(el => el.name === card.id);
    if (giftData) createModal(giftData, '../images/');
});

function updateCategory(active) {
    for (let key in categoryButtons) {
        if (key === active) {
            categoryButtons[key].classList.add('select');
            categoryButtons[key].disabled = true;
        } else {
            categoryButtons[key].classList.remove('select');
            categoryButtons[key].disabled = false;
        }
    }
};

function renderCards(category = null) {
    container.innerHTML = '';

    let itemsToRender = category ? data.filter(el => el.category === categories[category].label) : data;

    itemsToRender.forEach(el => createGiftCard(el, container, '../images/'));
};

function showWork() {
    updateCategory('work');
    renderCards('work');
};

function showHealth() {
    updateCategory('health');
    renderCards('health');
};

function showHarmony() {
    updateCategory('harmony');
    renderCards('harmony');
};

function showAll() {
    updateCategory('all');
    renderCards();
};

function handleScroll() {
    if (document.documentElement.scrollTop > 300) {
        scroller.classList.remove('hide');
    } else {
        scroller.classList.add('hide');
    }
};

window.addEventListener('scroll', handleScroll);
scroller.addEventListener('click', function () {
    document.documentElement.scrollTop = 0;
});
