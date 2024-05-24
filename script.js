const menuIcon = document.getElementById('menuIcon');
const headerNav = document.querySelector('.headerNav');
const overlay = document.getElementById('overlay');
const sectionOneH1 = document.querySelector('.sectionOneH1');

let touchStartX = 0;
let touchEndX = 0;

// Função para criar o efeito de digitação do título da sectionOne
function typeWriter(sectionOneH1) {
    const textoOriginal = sectionOneH1.innerHTML;
    sectionOneH1.innerHTML = '';
    
    let i = 0;
    const interval = setInterval(() => {
        if (i < textoOriginal.length) {
            sectionOneH1.innerHTML += textoOriginal.charAt(i);
            i++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                typeWriter(sectionOneH1); // Reinicia o efeito após um intervalo
            }, 1000); // Tempo de espera antes de reiniciar
        }
    }, 100); // Velocidade da digitação
}
typeWriter(sectionOneH1);


// Função para alternar a visibilidade do menu e do overlay
menuIcon.addEventListener('click', function(event) {
    event.stopPropagation(); // Impede o clique de propagação para o documento
    headerNav.classList.toggle('show');
    overlay.classList.toggle('show');
});

// Função para fechar o menu ao clicar fora
document.addEventListener('click', function(event) {
    const isClickInsideMenu = headerNav.contains(event.target);
    const isClickOnMenuIcon = menuIcon.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnMenuIcon) {
        closeMenu();
    }
});

// Fechar o menu ao clicar no overlay
overlay.addEventListener('click', function() {
    closeMenu();
});

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

// Função para fechar o menu
function closeMenu() {
    headerNav.classList.remove('show');
    overlay.classList.remove('show');
}