document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menuIcon');
    const headerNav = document.querySelector('.headerNav');
    const overlay = document.getElementById('overlay');

    let touchStartX = 0;
    let touchEndX = 0;

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

    // Função para fechar o menu ao rolar a página
    document.addEventListener('scroll', function() {
        closeMenu();
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
});
