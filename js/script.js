const menuIcon = document.getElementById('menuIcon');
const headerNav = document.querySelector('.headerNav');
const overlay = document.getElementById('overlay');
const clubesLink = document.querySelector('.headerNavMenuClube');
const clubesSubmenu = document.querySelector('.headerNavMenuEscudos');
const mainMenu = document.querySelector('.headerNavMenu ul');
const backButton = document.querySelector('.headerNavMenuEscudos .backButton');
const sectionOneH1 = document.querySelector('.sectionOneH1');

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


//Carrosel de imagens
let count = 1;
const totalSlides = 4;
const manualBtns = document.querySelectorAll('.manual-btn');
const sectionFourSlides = document.querySelector('.sectionFourSlides');
let startX = 0;
let isDragging = false;

// Inicialização
document.getElementById("radio1").checked = true;
manualBtns[0].classList.add('active');

// Configuração de intervalo para mudança automática de imagens
const interval = setInterval(nextImage, 5000);

function nextImage() {
    count = (count % totalSlides) + 1;
    updateSlide();
}

function prevImage() {
    count = (count - 2 + totalSlides) % totalSlides + 1;
    updateSlide();
}

// Atualiza o slide e os botões ativos
function updateSlide() {
    document.getElementById("radio" + count).checked = true;
    manualBtns.forEach(btn => btn.classList.remove('active'));
    manualBtns[count - 1].classList.add('active');
}

// Adiciona event listeners aos botões manuais
manualBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        count = index + 1;
        updateSlide();
    });
});

// Eventos de toque para arrastar
sectionFourSlides.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

sectionFourSlides.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diffX = startX - currentX;

    // Deslizar para a esquerda (próxima imagem)
    if (diffX > 50) {
        nextImage();
        isDragging = false;
    }
    // Deslizar para a direita (imagem anterior)
    if (diffX < -50) {
        prevImage();
        isDragging = false;
    }
});

sectionFourSlides.addEventListener('touchend', () => {
    isDragging = false;
});

//Section Quiz
function mostrarResultado(question, currentQuestionId, nextQuestionId) {
    const resultadoLabel = document.getElementById(`resultado${currentQuestionId.replace('question', '')}`);
    resultadoLabel.style.display = 'block';
    const isCorrect = question.value === 'true';

    resultadoLabel.textContent = isCorrect ? 'CORRETO!' : 'INCORRETO!';
    resultadoLabel.className = `sectionQuizResultado ${isCorrect ? 'correct' : 'incorrect'}`;

    if (!isCorrect) {
        // Se a resposta estiver incorreta, não avance para a próxima pergunta
        return;
    }

    setTimeout(() => {
        resultadoLabel.style.display = 'none';
        document.getElementById(currentQuestionId).style.display = 'none';
        if (nextQuestionId) {
            document.getElementById(nextQuestionId).style.display = 'flex';
        } else {
            document.getElementById('endMessage').style.display = 'flex'; // Mostra a mensagem de fim
        }
    }, 2000);
}


