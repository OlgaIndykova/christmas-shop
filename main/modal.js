import { createElement } from "./helper.js";
import { categories } from "./gifts-data.js";

const scroller = document.querySelector('.scrollToTop');
const imgCloseBtn = 'close.png';

export function createModal(giftData, basePath) {
    const body = document.querySelector(".body");
    body.classList.add('over');
    if (scroller) scroller.classList.add('hide');

    const modal = createElement('div', 'modal');
    const modalBody = createElement('div', 'modalBody');
    const closeBtn = createElement('img', 'closeBtn');
    const modalImg = createElement('div', 'modalImg');
    const img = document.createElement('img');
    const modalInfo = createElement('div', 'modalInfo');
    const generalInfo = createElement('div', 'generalInfo');
    const forWhat = createElement('div', 'forWhat');
    forWhat.textContent = giftData.category;
    const giftName = createElement('div', 'giftName');
    const giftDescription = createElement('div', 'giftDescription');
    const superpowers = createElement('div', 'superpowers');
    const superHeader = createElement('div', 'superHeader');
    superHeader.textContent = 'Adds superpowers to:';

    const superKeys = ['live', 'create', 'love', 'dream'];
    const superElements = superKeys.map(key => {
        const div = createElement('div', 'super');
        div.innerHTML = `<span>${key}</span><span>${giftData.superpowers[key]}</span><div>` +
            `<img src=${basePath}snowflake-modal.png>`.repeat(giftData.superpowers[key] / 100) + `</div>`;
        return div;
    });

    const categoryKey = Object.keys(categories).find(
        key => categories[key].label === giftData.category
    );

    const config = categoryKey ? categories[categoryKey] : null;

    if (config) {
        giftName.textContent = giftData.name;
        giftDescription.textContent = giftData.description;
        if (config.color) forWhat.style.color = config.color;
        if (config.image) img.src = basePath + config.image;
    };

    body.prepend(modal);
    modal.append(modalBody);
    modalBody.append(closeBtn, modalImg, modalInfo);
    modalImg.append(img);
    modalInfo.append(generalInfo, superpowers);
    generalInfo.append(forWhat, giftName, giftDescription);
    superpowers.append(superHeader, ...superElements);

    closeBtn.src = basePath + imgCloseBtn;

    const closeModal = (event) => {
        event.stopPropagation();
        modal.remove();
        body.classList.remove('over');
        
        if (!scroller) return;

        if (document.documentElement.scrollTop > 300) {
            scroller.classList.remove('hide');
        } else {
            scroller.classList.add('hide');
        }
    };

    modal.addEventListener("click", closeModal);
    modalBody.addEventListener("click", (e) => {
        e.stopPropagation();
    });
    closeBtn.addEventListener("click", closeModal);
};
