document.addEventListener('DOMContentLoaded', function() {
    // Obtener el UID del parámetro de consulta en la URL
    const params = new URLSearchParams(window.location.search);
    const uid = params.get('uid');
    
    const enlaceProductos = document.querySelector('.hm-menu li:nth-child(1) a');

    // Reemplazar el valor de uid en el atributo href del enlace
    let hrefActual = enlaceProductos.getAttribute('href');
    hrefActual = hrefActual.replace(/uid=\w+/, `uid=${uid}`);
    enlaceProductos.setAttribute('href', hrefActual);

    // Ahora puedes usar el UID como necesites
    console.log('UID del usuario:', uid);

    const headerMenu = document.querySelector('.hm-header');

    console.log(headerMenu.offsetTop);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 80) {
            headerMenu.classList.add('header-fixed');
        } else {
            headerMenu.classList.remove('header-fixed');
        }
    });

    /*=========================================
        Tabs
    ==========================================*/
    if (document.querySelector('.hm-tabs')) {

        const tabLinks = document.querySelectorAll('.hm-tab-link');
        const tabsContent = document.querySelectorAll('.tabs-content');

        tabLinks[0].classList.add('active');

        if (document.querySelector('.tabs-content')) {
            tabsContent[0].classList.add('tab-active');
        }


        for (let i = 0; i < tabLinks.length; i++) {

            tabLinks[i].addEventListener('click', () => {


                tabLinks.forEach((tab) => tab.classList.remove('active'));
                tabLinks[i].classList.add('active');

                tabsContent.forEach((tabCont) => tabCont.classList.remove('tab-active'));
                tabsContent[i].classList.add('tab-active');

            });

        }

    }

    /*=========================================
        MENU
    ==========================================*/

    const menu = document.querySelector('.icon-menu');
    const menuClose = document.querySelector('.cerrar-menu');

    menu.addEventListener('click', () => {
        document.querySelector('.header-menu-movil').classList.add('active');
    });

    menuClose.addEventListener('click', () => {
        document.querySelector('.header-menu-movil').classList.remove('active');
    });
});
