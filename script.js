const menuIcon = document.getElementById('menuIcon');
const headerNav = document.querySelector('.headerNav');
const overlay = document.getElementById('overlay');
const clubesLink = document.querySelector('.headerNavMenuClube');
const clubesSubmenu = document.querySelector('.headerNavMenuEscudos');
const mainMenu = document.querySelector('.headerNavMenu ul');
const backButton = document.querySelector('.headerNavMenuEscudos .backButton');

// Função para fechar o menu e o overlay
const closeMenu = () => {
    headerNav.classList.remove('show');
    overlay.classList.remove('show');
    clubesSubmenu.style.display = 'none';
    mainMenu.classList.remove('hide');
};

// Evento de clique no ícone do menu
menuIcon.addEventListener('click', (event) => {
    event.stopPropagation();
    headerNav.classList.toggle('show');
    overlay.classList.toggle('show');
});

// Evento de clique no documento para fechar o menu
document.addEventListener('click', (event) => {
    if (!headerNav.contains(event.target) && !menuIcon.contains(event.target) && !event.target.classList.contains('headerNavMenuClube')) {
        closeMenu();
    }
});

// Evento de clique no overlay para fechar o menu
overlay.addEventListener('click', closeMenu);

// Detectar gesto de arrastar no celular
let touchStartX = 0; // Inicializa a coordenada X do toque inicial como 0
const handleTouchStart = (event) => {
    touchStartX = event.touches[0].clientX; // Captura a coordenada X do toque inicial
};

const handleTouchMove = (event) => {
    const touchEndX = event.touches[0].clientX; // Captura a coordenada X do toque atual
    if (touchEndX - touchStartX > 50) { // Verifica se o gesto de deslizar para a direita foi realizado
        closeMenu(); // Fecha o menu
    }
};

document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchmove', handleTouchMove);


// Evento de clique em itens do menu para fechar o menu
document.querySelectorAll('.headerNavMenu a:not(.headerNavMenuClube):not(.backButton)').forEach(item => {
    item.addEventListener('click', closeMenu);
});

// Evento de clique no link "Clubes" para mostrar o submenu e manter o overlay
clubesLink.addEventListener('click', (event) => {
    event.preventDefault();
    mainMenu.classList.add('hide');
    clubesSubmenu.style.display = 'block';
    event.stopPropagation();
});

// Evento de clique no botão de voltar no submenu para voltar ao menu principal
backButton.addEventListener('click', (event) => {
    event.preventDefault();
    mainMenu.classList.remove('hide');
    clubesSubmenu.style.display = 'none';
    overlay.classList.add('show');
});