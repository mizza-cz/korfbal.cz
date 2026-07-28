(function ($) {
  "use strict";

  const DESKTOP_WIDTH = 1200;

  function bindHamburger() {
    const $body = $("body");
    const $opener = $(".js-header__opener");
    const $close = $(".js-header__close");

    function closeMenu() {
      $opener.removeClass("is-open");
      $body.removeClass("is-nav-open");

      $(".navbar__menu-list").removeClass("active");
      $(".has-submenu").removeClass("submenu-active");
      $(".js-submenu-toggle").attr("aria-expanded", "false");
    }

    $opener.off(".headerMenu").on("click.headerMenu", function (e) {
      e.preventDefault();
      e.stopPropagation();

      $opener.toggleClass("is-open");
      $body.toggleClass("is-nav-open");
    });

    $close.off(".headerMenu").on("click.headerMenu", function (e) {
      e.preventDefault();
      e.stopPropagation();

      closeMenu();
    });

    $(document)
      .off("click.headerMenu")
      .on("click.headerMenu", function (e) {
        if (
          $body.hasClass("is-nav-open") &&
          !$(e.target).closest(".headerNav__inner, .js-header__opener").length
        ) {
          closeMenu();
        }
      });
  }

  function bindMainMenu() {
    const $menuItems = $(".navbar__menu-item");
    const $menuLists = $(".navbar__menu-list");
    const $submenuItems = $(".has-submenu");
    const $submenuToggles = $(".js-submenu-toggle");

    let resizeTimer;
    let currentMode = null;

    function closeSubmenus($except) {
      const $items = $except ? $submenuItems.not($except) : $submenuItems;

      $items.removeClass("submenu-active");

      $items.children(".js-submenu-toggle").attr("aria-expanded", "false");
    }

    function resetMenu() {
      $menuLists.removeClass("active");
      closeSubmenus();
    }

    function unbindMenuEvents() {
      $menuItems.off(".mainMenu");
      $menuLists.off(".mainMenu");
      $submenuItems.off(".submenuMenu");
      $submenuToggles.off(".submenuMenu");
    }

    function bindDesktop() {
      $menuLists
        .on("mouseenter.mainMenu", function () {
          $menuLists.not(this).removeClass("active");
          $(this).addClass("active");
        })
        .on("mouseleave.mainMenu", function () {
          $(this).removeClass("active");
          closeSubmenus();
        });

      $submenuItems
        .on("mouseenter.submenuMenu", function () {
          const $current = $(this);

          closeSubmenus($current);

          $current.addClass("submenu-active");

          $current.children(".js-submenu-toggle").attr("aria-expanded", "true");
        })
        .on("mouseleave.submenuMenu", function () {
          $(this).removeClass("submenu-active");

          $(this).children(".js-submenu-toggle").attr("aria-expanded", "false");
        });

      $submenuToggles.on("click.submenuMenu", function (e) {
        e.preventDefault();
      });
    }

    function bindMobile() {
      $menuItems.on("click.mainMenu", function (e) {
        const $currentMenu = $(this).closest(".navbar__menu-list");
        const hasDropdown = $currentMenu.children(".dropdown-menu").length > 0;

        if (!hasDropdown) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();

        $menuLists.not($currentMenu).removeClass("active");

        $menuLists
          .not($currentMenu)
          .find(".has-submenu")
          .removeClass("submenu-active")
          .children(".js-submenu-toggle")
          .attr("aria-expanded", "false");

        $currentMenu.toggleClass("active");

        if (!$currentMenu.hasClass("active")) {
          $currentMenu
            .find(".has-submenu")
            .removeClass("submenu-active")
            .children(".js-submenu-toggle")
            .attr("aria-expanded", "false");
        }
      });

      $submenuToggles.on("click.submenuMenu", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const $current = $(this).closest(".has-submenu");
        const willOpen = !$current.hasClass("submenu-active");

        closeSubmenus($current);

        $current.toggleClass("submenu-active", willOpen);
        $(this).attr("aria-expanded", String(willOpen));
      });
    }

    function refreshMenu() {
      const newMode = window.innerWidth >= DESKTOP_WIDTH ? "desktop" : "mobile";

      if (newMode === currentMode) {
        return;
      }

      currentMode = newMode;

      unbindMenuEvents();
      resetMenu();

      if (currentMode === "desktop") {
        bindDesktop();
      } else {
        bindMobile();
      }
    }

    refreshMenu();

    $(window)
      .off("resize.mainMenu")
      .on("resize.mainMenu", function () {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(function () {
          refreshMenu();
        }, 150);
      });
  }

  $(function () {
    bindHamburger();
    bindMainMenu();
  });
})(jQuery);
