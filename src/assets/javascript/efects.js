window.addEventListener('load',() => {

    let sessionButton = document.querySelector('.session-btn');
    let userMenu = document.querySelector('.user_menu');

    sessionButton.addEventListener('mouseover', () => {
        const user = localStorage.length;
        if(user != 0)
            showMenu();
    })
    userMenu.addEventListener('mouseover', () => {
        showMenu();
    })
    userMenu.addEventListener('mouseout', () => {
        hideMenu();
    })
    function showMenu() {
        userMenu.classList.remove('hide');
        userMenu.classList.add('show');
    }
    function hideMenu() {
        userMenu.classList.remove('show');
        userMenu.classList.add('hide');
    }
})