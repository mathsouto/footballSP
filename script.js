const menuIcon = document.getElementById('menuIcon');
const headerNav = document.querySelector('.headerNav');
const overlay = document.getElementById('overlay');
const sectionOneH1 = document.querySelector('.sectionOneH1');

let touchStartX = 0;
let touchEndX = 0;

// Função para criar o efeito de digitação
function typeWriter(element, text) {
    const originalText = text;
    element.innerHTML = '';
    
    let i = 0;
    const interval = setInterval(() => {
        if (i < originalText.length) {
            element.innerHTML += originalText.charAt(i);
            i++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                typeWriter(element, originalText); // Reinicia o efeito após um intervalo
            }, 1000); // Tempo de espera antes de reiniciar
        }
    }, 100); // Velocidade da digitação
}

typeWriter(sectionOneH1, sectionOneH1.innerHTML);

// Função para fechar o menu e o overlay
function closeMenu() {
    headerNav.classList.remove('show');
    overlay.classList.remove('show');
}

// Evento de clique no ícone do menu
menuIcon.addEventListener('click', function(event) {
    event.stopPropagation(); // Impede o clique de propagação para o documento
    headerNav.classList.toggle('show');
    overlay.classList.toggle('show');
});

// Evento de clique fora do menu para fechá-lo
document.addEventListener('click', function(event) {
    const isClickInsideMenu = headerNav.contains(event.target);
    const isClickOnMenuIcon = menuIcon.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnMenuIcon) {
        closeMenu();
    }
});

// Evento de clique no overlay para fechar o menu
overlay.addEventListener('click', closeMenu);

// Detectar gesto de arrastar no celular
document.addEventListener('touchstart', function(event) {
    touchStartX = event.touches[0].clientX;
});

document.addEventListener('touchmove', function(event) {
    touchEndX = event.touches[0].clientX;
});

document.addEventListener('touchend', function(event) {
    if (touchEndX - touchStartX > 50) {
        closeMenu();
    }
});

// Evento de clique em itens do menu para fechar o menu
const menuItems = document.querySelectorAll('.headerNavMenu a');
menuItems.forEach(item => {
    if (!item.classList.contains('headerNavMenuClube')) { // Verifique se o item não possui a classe
        item.addEventListener('click', closeMenu);
    }
});

const clubesLink = document.querySelector('.headerNavMenuClube');
const escudosMenu = document.querySelector('.headerNavMenuEscudos');

clubesLink.addEventListener('click', function(event) {
    event.preventDefault();
    toggleSubMenu(escudosMenu);
});

function toggleSubMenu(subMenu) {
    if (subMenu.style.display === 'none' || subMenu.style.display === '') {
        subMenu.style.display = 'block';
    } else {
        subMenu.style.display = 'none';
    }
}