const menuIcon = document.getElementById('menuIcon');
const headerNav = document.querySelector('.headerNav');
let menuOpen = false;

menuIcon.addEventListener('click', function() {
    menuOpen = !menuOpen;
    headerNav.classList.toggle('show', menuOpen);
    menuIcon.src = menuOpen ? './assets/icons/menuIcon2.svg' : './assets/icons/menuIcon.svg';
});