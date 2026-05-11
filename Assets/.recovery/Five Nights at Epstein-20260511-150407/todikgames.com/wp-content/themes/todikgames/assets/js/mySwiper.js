document.addEventListener("DOMContentLoaded", function () {
    let swiper = new Swiper(".mySwiper", {
        slidesPerView: 6,
        // spaceBetween: 5,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
         breakpoints: {
            // Когда ширина окна браузера >= 320px
            320: {
                slidesPerView: 2, // 1 слайд на маленьких экранах
            },
            // Когда ширина окна браузера >= 480px
            480: {
                slidesPerView: 2, // 2 слайда на средних экранах
            },
            // Когда ширина окна браузера >= 640px
            640: {
                slidesPerView: 4, // 3 слайда на более широких экранах
            },
            // Адаптируйте эти точки в соответствии с вашими нуждами
            1024: {
                slidesPerView: 6,
            }
        }
    });
});
