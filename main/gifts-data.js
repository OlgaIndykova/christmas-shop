import { createElement } from "./helper.js";

export let data = [];
export async function loadGifts(path) {
    const response = await fetch(path);
    const json = await response.json();
    data = json;
    return data;
}

const BLUE = '#4361FF';
const GREEN = '#06A44F';
const PINK = '#FF43F7';

export const categories = {
    work: {
        label: 'For Work',
        color: BLUE,
        image: 'image1.png',
    },
    health: {
        label: 'For Health',
        color: GREEN,
        image: 'image2.png',
    },
    harmony: {
        label: 'For Harmony',
        color: PINK,
        image: 'image3.png',
    },
};

export function createGiftCard(el, container, basePath) {
    const giftItem = createElement('div', 'presentItem');
    giftItem.id = el.name;

    const giftImg = createElement('div', 'presentImg');
    const giftInfo = createElement('div', 'presentInfo');

    const img = document.createElement('img');
    img.alt = el.name;

    const forWhat = document.createElement('div');
    forWhat.textContent = el.category;

    const giftName = document.createElement('div');
    giftName.textContent = el.name;

    container.append(giftItem);
    giftItem.append(giftImg, giftInfo);
    giftImg.append(img);
    giftInfo.append(forWhat, giftName);

    const categoryKey = Object.keys(categories).find(key => categories[key].label === el.category);
    const config = categoryKey ? categories[categoryKey] : null;

    if (config) {
        forWhat.style.color = config.color;
        img.src = basePath + config.image;
    }
};