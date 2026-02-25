const body = document.querySelector('.body');
const burgerIcon = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burgerMenu');
const lineUp = document.querySelector('.lineUp');
const lineDown = document.querySelector('.lineDown');

burgerIcon.addEventListener('click', showMobileMenu);

function showMobileMenu() {
    burgerMenu.classList.toggle('hidden');
    burgerIcon.classList.toggle('zerogap');
    lineUp.classList.toggle('rotate__right');
    lineDown.classList.toggle('rotate__left');
    body.classList.toggle('over');
};
