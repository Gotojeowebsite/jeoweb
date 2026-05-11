document.addEventListener("DOMContentLoaded", () => {
  const copyrightYear = document.querySelector(".footer__copyright-yaer");
  const copyrightHost = document.querySelector(".footer__copyright-link");
  const topScrollButton = document.querySelector(".footer__top-scroll");
  const menuToggle = document.querySelector("#menu-toggle");

  copyrightYear.textContent = new Date().getFullYear();
  copyrightHost.textContent = window.location.hostname;
  // copyrightHost.href = window.location.href;

  topScrollButton.addEventListener("click", () => {
    window.scrollTo(0, 0);
  });
  // Получаем путь текущей страницы без начального слеша
  const path = window.location.pathname.slice(1);

  // Проверяем, является ли текущая страница главной или страницей пагинации
  if (path === "" || path === "index.php" || path.startsWith("page/")) {
    // Получаем все ссылки внутри элемента с классом wp-pagenavi
    const links = document.querySelectorAll(".wp-pagenavi a");

    // Проверяем, найдены ли ссылки
    if (links.length) {
      // Проходимся по каждой ссылке
      links.forEach(function (link) {
        const oldUrl = link.getAttribute("href"); // Получаем текущий URL из атрибута href
        const newUrl = oldUrl + "#section_all"; // Добавляем якорь к URL
        link.setAttribute("href", newUrl); // Обновляем атрибут href ссылки
      });
    }
  }

  const moreButton = document.querySelector(".navigation__link");
  if (moreButton) {
    moreButton.addEventListener("click", function () {
      const categoryList = document.querySelector("#categoryList");
      const categoryNav = document.querySelector("#categoryNav");
      const hiddenItems = document.querySelectorAll(
        ".navigation__list-item#hidden"
      );
      hiddenItems.forEach((item) => {
        item.classList.toggle("hidden");
      });
      categoryList.classList.toggle("grid");
      categoryNav.classList.toggle("open");
      if (categoryList.classList.contains("grid")) {
        moreButton.textContent = "Less categories"; // Если в grid режиме, показать "Less categories"
      } else {
        moreButton.textContent = "More categories"; // Если в flex режиме, показать "More categories"
      }
    });
  }

  const fullscreenButton = document.getElementById("fullscreenButton");
  const iframe = document.getElementsByTagName("iframe")[0];
  if (iframe) {
    fullscreenButton.style.display = "block";
  }

  if (fullscreenButton) {
    fullscreenButton.addEventListener("click", function () {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.mozRequestFullScreen) {
        /* Firefox */
        iframe.mozRequestFullScreen();
      } else if (iframe.webkitRequestFullscreen) {
        /* Chrome, Safari & Opera */
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {
        /* IE/Edge */
        iframe.msRequestFullscreen();
      }
    });
  }

  function disableScroll() {
    document.body.style.overflow = "hidden";
  }

  function enableScroll() {
    document.body.style.overflow = "";
  }

  menuToggle.addEventListener("change", function () {
    if (this.checked) {
      disableScroll();
    } else {
      enableScroll();
    }
  });

  if (menuToggle.checked) {
    disableScroll();
  } else {
    enableScroll();
  }
});
