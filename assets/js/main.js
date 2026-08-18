/* ============================================================
   Sugar & Scoop — Main JavaScript
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Helpers ---------- */
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var STORE_KEY = "sugarScoopCart";

  /* ---------- Theme toggle ---------- */
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-bs-theme", theme);
    try { localStorage.setItem("si_theme", theme); } catch (e) {}
    $$("[data-theme-switch]").forEach(function (btn) {
      var icon = btn.querySelector("i");
      if (icon) {
        icon.className = theme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
      }
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    });
  }
  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem("si_theme"); } catch (e) {}
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(saved || (prefersDark ? "dark" : "light"));
    $$("[data-theme-switch]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var next = document.documentElement.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
        applyTheme(next);
      });
    });
  }

  /* ---------- RTL / LTR direction toggle ---------- */
  function setDirection(dir) {
    var isRtl = (dir === "rtl");
    var finalDir = isRtl ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", finalDir);
    document.documentElement.setAttribute("lang", isRtl ? "ar" : "en");
    var link = document.getElementById("mainBootstrapCss");
    if (link) {
      var currentHref = link.getAttribute("href") || "";
      var prefix = currentHref.indexOf("../") === 0 ? "../" : "";
      link.setAttribute("href", prefix + (isRtl ? "assets/css/bootstrap.rtl.min.css" : "assets/css/bootstrap.min.css"));
    }
    try {
      localStorage.setItem("si_dir", finalDir);
      localStorage.setItem("layoutDirection", finalDir);
    } catch (e) {}

    // Update all toggle pill switches
    $$("[data-dir-switch]").forEach(function (btn) {
      var ltrOpt = btn.querySelector(".dir-opt-ltr");
      var rtlOpt = btn.querySelector(".dir-opt-rtl");
      if (ltrOpt && rtlOpt) {
        if (isRtl) {
          ltrOpt.classList.remove("active");
          rtlOpt.classList.add("active");
        } else {
          ltrOpt.classList.add("active");
          rtlOpt.classList.remove("active");
        }
      }
      var icon = btn.querySelector("i");
      if (icon) {
        icon.className = isRtl ? "bi bi-text-left" : "bi bi-text-right";
      }
      btn.setAttribute("aria-label", isRtl ? "Current layout is RTL. Switch to LTR" : "Current layout is LTR. Switch to RTL");
      btn.setAttribute("title", isRtl ? "Switch to LTR" : "Switch to RTL");
      btn.classList.toggle("is-rtl", isRtl);
    });

    // Update any explicit direction buttons (e.g. inside mobile menu drawer)
    $$("[data-dir-set]").forEach(function (btn) {
      var targetDir = btn.getAttribute("data-dir-set");
      if (targetDir === finalDir) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  function initDirection() {
    var saved = null;
    try {
      saved = localStorage.getItem("si_dir") || localStorage.getItem("layoutDirection");
    } catch (e) {}
    var initial = (saved === "rtl" || document.documentElement.getAttribute("dir") === "rtl") ? "rtl" : "ltr";
    setDirection(initial);

    $$("[data-dir-switch]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var current = document.documentElement.getAttribute("dir") === "rtl" ? "rtl" : "ltr";
        setDirection(current === "rtl" ? "ltr" : "rtl");
      });
    });

    $$("[data-dir-set]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var targetDir = btn.getAttribute("data-dir-set");
        if (targetDir) {
          setDirection(targetDir);
        }
      });
    });
  }

  /* ---------- Active Navbar State Detection & Click Updates ---------- */
  function setActiveNavByTarget(targetPathOrName) {
    var raw = (targetPathOrName || window.location.pathname || "").toLowerCase();
    var filename = raw.split("/").pop().split("?")[0].split("#")[0];
    
    // Normalize root, empty, or index variations
    if (!filename || filename === "" || filename === "index" || filename === "home" || filename === "home 1") {
      filename = "index.html";
    } else if (filename === "home-2" || filename === "home 2") {
      filename = "home-2.html";
    }

    var desktopLinks = $$(".site-header #mainNav .nav-link");
    var desktopDropdownItems = $$(".site-header #mainNav .dropdown-item");
    var mobileLinks = $$("#mobileMenu .nav-link");

    // Remove active from all first
    desktopLinks.forEach(function (link) { link.classList.remove("active"); });
    desktopDropdownItems.forEach(function (item) { item.classList.remove("active"); });
    mobileLinks.forEach(function (link) { link.classList.remove("active"); });

    // Determine category
    var isHome = (filename === "index.html" || filename === "home-2.html");
    var isAbout = (filename === "about.html");
    var isPricing = (filename === "pricing.html");
    var isContact = (filename === "contact.html");
    var isBlog = (filename.indexOf("blog") === 0);
    var isMenu = (filename === "menu.html" ||
                  filename === "ice-cream.html" ||
                  filename === "sundaes.html" ||
                  filename === "waffles.html" ||
                  filename === "crepes.html" ||
                  filename === "milkshakes.html" ||
                  filename === "product-details.html" ||
                  filename === "seasonal-specials.html");

    // Desktop nav-links (dropdown toggle or direct links)
    desktopLinks.forEach(function (link) {
      var text = (link.textContent || "").trim().toLowerCase();
      var href = (link.getAttribute("href") || "").split("?")[0].split("#")[0].toLowerCase();
      var linkFile = href.split("/").pop();

      if (isHome && (text.indexOf("home") === 0 || link.classList.contains("dropdown-toggle"))) {
        link.classList.add("active");
      } else if (isAbout && (linkFile === "about.html" || text === "about")) {
        link.classList.add("active");
      } else if (isMenu && (linkFile === "menu.html" || text === "menu")) {
        link.classList.add("active");
      } else if (isPricing && (linkFile === "pricing.html" || text === "pricing")) {
        link.classList.add("active");
      } else if (isBlog && (linkFile === "blog.html" || text === "blog")) {
        link.classList.add("active");
      } else if (isContact && (linkFile === "contact.html" || text === "contact")) {
        link.classList.add("active");
      }
    });

    // Desktop dropdown items
    desktopDropdownItems.forEach(function (item) {
      var href = (item.getAttribute("href") || "").split("?")[0].split("#")[0].toLowerCase();
      var itemFile = href.split("/").pop();
      if (filename === "home-2.html" && itemFile === "home-2.html") {
        item.classList.add("active");
      } else if ((filename === "index.html" || !filename) && (itemFile === "index.html" || itemFile === "")) {
        item.classList.add("active");
      }
    });

    // Mobile nav links
    mobileLinks.forEach(function (link) {
      var href = (link.getAttribute("href") || "").split("?")[0].split("#")[0].toLowerCase();
      var linkFile = href.split("/").pop();
      var text = (link.textContent || "").trim().toLowerCase();

      if (link.classList.contains("dropdown-toggle")) {
        if (isHome) {
          link.classList.add("active");
        }
      } else if (filename === "home-2.html" && (linkFile === "home-2.html" || text === "home 2")) {
        link.classList.add("active");
      } else if ((filename === "index.html" || !filename) && (linkFile === "index.html" || text === "home 1")) {
        link.classList.add("active");
      } else if (isAbout && (linkFile === "about.html" || text === "about")) {
        link.classList.add("active");
      } else if (isMenu && (linkFile === "menu.html" || text === "full menu" || text.indexOf("menu") !== -1)) {
        link.classList.add("active");
      } else if (isPricing && (linkFile === "pricing.html" || text === "pricing")) {
        link.classList.add("active");
      } else if (isBlog && (linkFile === "blog.html" || text === "blog")) {
        link.classList.add("active");
      } else if (isContact && (linkFile === "contact.html" || text === "contact")) {
        link.classList.add("active");
      }
    });
  }

  function initActiveNav() {
    // Initial page load / URL detection
    setActiveNavByTarget(window.location.pathname);

    // Bind click handlers to all navigation links for immediate visual feedback on click
    var allNavLinks = $$(".site-header #mainNav a, #mobileMenu a, .site-header .brand-logo");
    allNavLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        var href = link.getAttribute("href");
        if (!href || href === "#" || href.indexOf("#") === 0) return;
        setActiveNavByTarget(href);
      });
    });
  }

  /* ---------- Navbar scroll state ---------- */
  function initNavbar() {
    initActiveNav();
    var header = $(".site-header");
    if (!header) return;
    var onScroll = function () {
      if (window.scrollY > 30) header.classList.add("navbar-scrolled");
      else header.classList.remove("navbar-scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Hero slider ---------- */
  function initHeroSlider() {
    var slides = $$(".hero-slide");
    if (!slides.length) return;
    var index = 0;

    function go(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach(function (slide, j) {
        slide.classList.toggle("active", j === index);
      });
    }

    function next() { go(index + 1); }

    var t = setInterval(next, 6500);
    var hero = $(".hero");
    if (hero) {
      hero.addEventListener("mouseenter", function () { clearInterval(t); });
      hero.addEventListener("mouseleave", function () { t = setInterval(next, 6500); });
    }
  }


  /* ---------- Cart & Checkout Flow ---------- */
  function getCart() {
    try {
      var data = localStorage.getItem(STORE_KEY);
      if (!data) {
        data = localStorage.getItem("si_cart");
        if (data) {
          localStorage.setItem(STORE_KEY, data);
          try { localStorage.removeItem("si_cart"); } catch (e) {}
        }
      }
      return JSON.parse(data) || [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(items) {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(items));
    } catch (e) {}
  }

  function getCheckoutUrl() {
    if (window.location.pathname.indexOf("/documentation/") !== -1) {
      return "../checkout.html";
    }
    return "checkout.html";
  }

  function escapeHtml(s) {
    return String(s || "").replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function formatPrice(n) {
    var num = parseFloat(n) || 0;
    return "$" + num.toFixed(2);
  }

  function renderCartBadge() {
    var items = getCart();
    var count = items.reduce(function (n, it) { return n + (parseInt(it.qty, 10) || 1); }, 0);
    $$("[data-cart-count]").forEach(function (el) {
      el.textContent = count;
      el.style.display = count > 0 ? "" : "none";
    });
  }

  function renderCartDrawer() {
    var list = $("[data-cart-items]");
    var empty = $("[data-cart-empty]");
    var totalEl = $("[data-cart-total]");
    var items = getCart();
    if (!list) return;
    list.innerHTML = "";
    var total = 0;

    items.forEach(function (it, idx) {
      var price = parseFloat(it.price) || 0;
      var qty = parseInt(it.qty, 10) || 1;
      var lineTotal = price * qty;
      total += lineTotal;

      var div = document.createElement("div");
      div.className = "cart-item d-flex align-items-center gap-3 p-2 mb-2 rounded-3 border bg-surface";
      var sizeBadge = (it.size && it.size !== "Regular") ? ' <span class="badge rounded-pill ms-1" style="background:var(--si-gradient-soft);color:var(--si-pink);font-size:.7rem">' + escapeHtml(it.size) + '</span>' : '';
      div.innerHTML =
        '<img src="' + escapeHtml(it.img || 'assets/images/ice-cream/cone-sprinkle.jpg') + '" alt="' + escapeHtml(it.name) + '" style="width:48px;height:48px;border-radius:10px;object-fit:cover;flex-shrink:0">' +
        '<div class="flex-grow-1 min-w-0">' +
          '<div class="cart-item-name font-display fw-bold text-truncate" style="font-size:0.9rem">' + escapeHtml(it.name) + sizeBadge + '</div>' +
          '<div class="cart-item-price text-muted-soft small mb-1">' + formatPrice(price) + ' &times; ' + qty + ' = <strong class="text-pink">' + formatPrice(lineTotal) + '</strong></div>' +
          '<div class="d-inline-flex align-items-center border rounded-pill px-2 py-0" style="background:var(--si-surface-2)">' +
            '<button type="button" class="btn btn-sm p-0 border-0 text-muted" data-cart-dec="' + idx + '" aria-label="Decrease quantity" style="line-height:1;width:18px;height:22px"><i class="bi bi-dash"></i></button>' +
            '<span class="px-2 small fw-bold" style="min-width:20px;text-align:center">' + qty + '</span>' +
            '<button type="button" class="btn btn-sm p-0 border-0 text-muted" data-cart-inc="' + idx + '" aria-label="Increase quantity" style="line-height:1;width:18px;height:22px"><i class="bi bi-plus"></i></button>' +
          '</div>' +
        '</div>' +
        '<button type="button" class="btn btn-sm btn-outline-soft p-2 border-0" data-cart-remove="' + idx + '" aria-label="Remove item">' +
          '<i class="bi bi-trash3 text-danger"></i>' +
        '</button>';
      list.appendChild(div);
    });

    $$("[data-cart-inc]", list).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var idx = parseInt(btn.getAttribute("data-cart-inc"), 10);
        var all = getCart();
        if (all[idx]) {
          all[idx].qty = (parseInt(all[idx].qty, 10) || 1) + 1;
          saveCart(all);
          renderCartBadge();
          renderCartDrawer();
          renderCheckoutPage();
        }
      });
    });

    $$("[data-cart-dec]", list).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var idx = parseInt(btn.getAttribute("data-cart-dec"), 10);
        var all = getCart();
        if (all[idx]) {
          if ((parseInt(all[idx].qty, 10) || 1) > 1) {
            all[idx].qty -= 1;
          } else {
            all.splice(idx, 1);
          }
          saveCart(all);
          renderCartBadge();
          renderCartDrawer();
          renderCheckoutPage();
        }
      });
    });

    $$("[data-cart-remove]", list).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var idx = parseInt(btn.getAttribute("data-cart-remove"), 10);
        var all = getCart();
        all.splice(idx, 1);
        saveCart(all);
        renderCartBadge();
        renderCartDrawer();
        renderCheckoutPage();
      });
    });

    if (empty) empty.style.display = items.length ? "none" : "";
    if (totalEl) totalEl.textContent = formatPrice(total);
  }

  function renderCheckoutPage() {
    var emptyState = $("#checkoutEmptyState");
    var activeState = $("#checkoutActiveState");
    var itemsList = $("#checkoutCartItems");
    var subtotalEl = $("#coSubtotal");
    var grandTotalEl = $("#coGrandTotal");
    if (!itemsList || !emptyState || !activeState) return;

    var items = getCart();
    if (!items.length) {
      emptyState.style.display = "block";
      activeState.style.display = "none";
      return;
    }

    emptyState.style.display = "none";
    activeState.style.display = "block";
    itemsList.innerHTML = "";
    var total = 0;

    items.forEach(function (it, idx) {
      var price = parseFloat(it.price) || 0;
      var qty = parseInt(it.qty, 10) || 1;
      var lineTotal = price * qty;
      total += lineTotal;

      var div = document.createElement("div");
      div.className = "d-flex align-items-center justify-content-between gap-3 p-3 rounded-3 border bg-surface";
      var sizeText = (it.size && it.size !== "Regular") ? '<span class="badge rounded-pill ms-1" style="background:var(--si-gradient-soft);color:var(--si-pink);font-size:.7rem">' + escapeHtml(it.size) + '</span>' : '';
      div.innerHTML =
        '<div class="d-flex align-items-center gap-3">' +
          '<img src="' + escapeHtml(it.img || 'assets/images/ice-cream/cone-sprinkle.jpg') + '" alt="' + escapeHtml(it.name) + '" style="width:52px;height:52px;border-radius:10px;object-fit:cover" />' +
          '<div>' +
            '<div class="font-display fw-bold mb-0" style="font-size:0.95rem">' + escapeHtml(it.name) + sizeText + '</div>' +
            '<div class="text-muted-soft small mb-1">' + formatPrice(price) + ' each</div>' +
            '<div class="d-inline-flex align-items-center border rounded-pill px-2 py-0" style="background:var(--si-surface-2)">' +
              '<button type="button" class="btn btn-sm p-0 border-0 text-muted" data-co-dec="' + idx + '" aria-label="Decrease quantity" style="line-height:1;width:18px;height:22px"><i class="bi bi-dash"></i></button>' +
              '<span class="px-2 small fw-bold" style="min-width:20px;text-align:center">' + qty + '</span>' +
              '<button type="button" class="btn btn-sm p-0 border-0 text-muted" data-co-inc="' + idx + '" aria-label="Increase quantity" style="line-height:1;width:18px;height:22px"><i class="bi bi-plus"></i></button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="d-flex align-items-center gap-3">' +
          '<span class="product-price fw-bold">' + formatPrice(lineTotal) + '</span>' +
          '<button type="button" class="btn btn-sm btn-outline-soft" data-checkout-page-remove="' + idx + '" aria-label="Remove item">' +
            '<i class="bi bi-trash3 text-danger"></i>' +
          '</button>' +
        '</div>';
      itemsList.appendChild(div);
    });

    if (subtotalEl) subtotalEl.textContent = formatPrice(total);
    if (grandTotalEl) grandTotalEl.textContent = formatPrice(total);

    $$("[data-co-inc]", itemsList).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var idx = parseInt(btn.getAttribute("data-co-inc"), 10);
        var all = getCart();
        if (all[idx]) {
          all[idx].qty = (parseInt(all[idx].qty, 10) || 1) + 1;
          saveCart(all);
          renderCartBadge();
          renderCartDrawer();
          renderCheckoutPage();
        }
      });
    });

    $$("[data-co-dec]", itemsList).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var idx = parseInt(btn.getAttribute("data-co-dec"), 10);
        var all = getCart();
        if (all[idx]) {
          if ((parseInt(all[idx].qty, 10) || 1) > 1) {
            all[idx].qty -= 1;
          } else {
            all.splice(idx, 1);
          }
          saveCart(all);
          renderCartBadge();
          renderCartDrawer();
          renderCheckoutPage();
        }
      });
    });

    $$("[data-checkout-page-remove]", itemsList).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var idx = parseInt(btn.getAttribute("data-checkout-page-remove"), 10);
        var all = getCart();
        all.splice(idx, 1);
        saveCart(all);
        renderCartBadge();
        renderCartDrawer();
        renderCheckoutPage();
      });
    });
  }

  function initCheckoutForm() {
    var form = $("#checkoutForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var items = getCart();
      if (!items.length) {
        showToast("Your cart is empty! Please add items before checking out.", "error");
        return;
      }
      var fullName = $("#coFullName");
      var email = $("#coEmail");
      var phone = $("#coPhone");
      var address = $("#coAddress");
      var city = $("#coCity");
      var zip = $("#coZip");
      if (!fullName || !email || !phone || !address || !city || !zip ||
          !fullName.value.trim() || !email.value.trim() || !phone.value.trim() || !address.value.trim() || !city.value.trim() || !zip.value.trim()) {
        showToast("Please fill in all required delivery fields.", "error");
        return;
      }
      var btn = $("#btnPlaceOrder");
      var origText = btn ? btn.innerHTML : "";
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Placing Order...';
      }
      setTimeout(function () {
        saveCart([]);
        renderCartBadge();
        renderCartDrawer();
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = origText;
        }
        var activeState = $("#checkoutActiveState");
        if (activeState) {
          activeState.innerHTML =
            '<div class="text-center py-5"><div class="si-card p-5 mx-auto" style="max-width:560px">' +
            '<i class="bi bi-check-circle-fill text-success" style="font-size:4rem"></i>' +
            '<h2 class="font-display mt-3 mb-2">Order Confirmed!</h2>' +
            '<p class="text-muted-soft mb-3">Thank you for your order, ' + escapeHtml(fullName.value.trim()) + '! We have received your request and our dessert artisans are already preparing your fresh treats.</p>' +
            '<div class="alert alert-soft p-3 mb-4 text-start small"><strong>Delivery Details:</strong><br>' + escapeHtml(address.value.trim()) + ', ' + escapeHtml(city.value.trim()) + ' ' + escapeHtml(zip.value.trim()) + '<br>Contact: ' + escapeHtml(phone.value.trim()) + '</div>' +
            '<a href="menu.html" class="btn btn-grad btn-lg">Back to Menu</a>' +
            '</div></div>';
        }
        showToast("Order placed successfully! Check your email for confirmation.", "success");
      }, 1200);
    });
  }

  function addToCart(item) {
    var items = getCart();
    var itemSize = item.size ? item.size.trim() : "Regular";
    var itemQty = Math.max(1, parseInt(item.qty, 10) || 1);
    var itemPrice = parseFloat(item.price) || 4.5;
    var itemId = item.id || ("p-" + Math.random().toString(36).slice(2, 8));
    var itemName = item.name || "Dessert";
    var itemImg = item.img || "assets/images/ice-cream/cone-sprinkle.jpg";

    var found = items.find(function (it) {
      return (it.id === itemId || it.name === itemName) && ((it.size || "Regular") === itemSize);
    });

    if (found) {
      found.qty = (parseInt(found.qty, 10) || 1) + itemQty;
      found.price = itemPrice;
      if (itemImg && (!found.img || found.img.indexOf('placeholder') !== -1)) found.img = itemImg;
    } else {
      items.push({
        id: itemId,
        name: itemName,
        size: itemSize,
        price: itemPrice,
        img: itemImg,
        qty: itemQty
      });
    }

    saveCart(items);
    renderCartBadge();
    renderCartDrawer();
    renderCheckoutPage();

    return {
      name: itemName,
      size: itemSize,
      qty: itemQty,
      price: itemPrice
    };
  }

  function initCart() {
    renderCartBadge();
    var drawer = $("#cartDrawer");
    if (drawer) {
      drawer.addEventListener("shown.bs.offcanvas", renderCartDrawer);
      renderCartDrawer();
    }
    renderCheckoutPage();
    initCheckoutForm();

    // Sync across browser tabs
    window.addEventListener("storage", function (e) {
      if (e.key === STORE_KEY || e.key === "si_cart") {
        renderCartBadge();
        renderCartDrawer();
        renderCheckoutPage();
      }
    });

    // Prevent proceeding to checkout when cart is empty
    $$("a[href*='checkout.html']").forEach(function (link) {
      link.addEventListener("click", function (e) {
        if (window.location.pathname.indexOf("checkout.html") !== -1) return;
        var items = getCart();
        if (!items.length) {
          e.preventDefault();
          showToast("Your cart is empty! Add treats from our menu first.", "info");
        }
      });
    });

    // Handle all data-add-to-cart buttons across the website (stays on page, shows toast confirmation)
    $$("[data-add-to-cart]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var card = btn.closest("[data-product]") || btn.closest(".product-card") || btn;
        var section = btn.closest("section");
        var qtyEl = section ? $(".qty-stepper input", section) : null;
        var qty = qtyEl ? (parseInt(qtyEl.value, 10) || 1) : (parseInt(btn.getAttribute("data-product-qty"), 10) || 1);
        var activeSizeBtn = section ? $(".size-btn.active", section) : null;
        var sizeName = activeSizeBtn ? (activeSizeBtn.getAttribute("data-size") || "Regular") : (btn.getAttribute("data-product-size") || "Regular");
        var price = activeSizeBtn ? (parseFloat(activeSizeBtn.getAttribute("data-price")) || parseFloat(btn.getAttribute("data-product-price")) || 4.5) : (parseFloat(btn.getAttribute("data-product-price")) || (card ? parseFloat(card.getAttribute("data-product-price")) : 4.5) || 4.5);
        var id = btn.getAttribute("data-product-id") || (card ? card.getAttribute("data-product-id") : null) || ("p-" + Math.random().toString(36).slice(2, 8));
        var name = btn.getAttribute("data-product-name") || (card ? (card.getAttribute("data-product-name") || ($(".product-title", card) ? $(".product-title", card).textContent.trim() : "Dessert")) : ($("#pdHeading") ? $("#pdHeading").textContent.trim() : "Dessert"));
        var img = btn.getAttribute("data-product-img") || (card && $("img", card) ? $("img", card).src : (section && $("img", section) ? $("img", section).src : ($("#pdMainImage") ? $("#pdMainImage").src : "assets/images/ice-cream/cone-sprinkle.jpg")));

        var added = addToCart({
          id: id,
          name: name,
          size: sizeName,
          price: price,
          img: img,
          qty: qty
        });

        var confirmMsg = (added.name || "Item") + (added.size && added.size !== "Regular" ? " (" + added.size + ")" : "") + " added to cart!";
        showToast(confirmMsg, "success");
      });
    });

    // Handle Order Now buttons (e.g. pdOrderNowBtn, orderNowBtn, etc.)
    $$("#pdOrderNowBtn, #orderNowBtn, [data-order-now]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var section = btn.closest("section");
        var addBtn = section ? $("[data-add-to-cart]", section) : null;
        var qtyEl = section ? $(".qty-stepper input", section) : null;
        var qty = qtyEl ? (parseInt(qtyEl.value, 10) || 1) : 1;
        var activeSizeBtn = section ? $(".size-btn.active", section) : null;
        var sizeName = activeSizeBtn ? (activeSizeBtn.getAttribute("data-size") || "Regular") : "Regular";
        var price = activeSizeBtn ? (parseFloat(activeSizeBtn.getAttribute("data-price")) || 4.5) : (addBtn ? (parseFloat(addBtn.getAttribute("data-product-price")) || 4.5) : 4.5);
        var id = addBtn ? (addBtn.getAttribute("data-product-id") || "p-201") : "p-201";
        var name = addBtn ? (addBtn.getAttribute("data-product-name") || "Dessert") : ($("#pdHeading") ? $("#pdHeading").textContent.trim() : "Dessert");
        var img = addBtn ? (addBtn.getAttribute("data-product-img") || "") : ($("#pdMainImage") ? $("#pdMainImage").src : "assets/images/ice-cream/cone-sprinkle.jpg");

        addToCart({
          id: id,
          name: name,
          size: sizeName,
          price: price,
          img: img,
          qty: qty
        });

        window.location.href = getCheckoutUrl();
      });
    });
  }

  /* ---------- Product view: gallery thumbs + size selector ---------- */
  function initProductView() {
    var sizeWrap = $("[data-size-select]");
    if (sizeWrap) {
      var section = sizeWrap.closest("section");
      var display = $("[data-product-price-display]");
      var addBtn = section ? $("[data-add-to-cart]", section) : null;
      $$(".size-btn", sizeWrap).forEach(function (btn) {
        btn.addEventListener("click", function () {
          $$(".size-btn", sizeWrap).forEach(function (x) { x.classList.remove("active"); });
          btn.classList.add("active");
          if (addBtn) addBtn.setAttribute("data-product-price", btn.getAttribute("data-price"));
          if (display) display.textContent = formatPrice(parseFloat(btn.getAttribute("data-price")) || 0);
        });
      });
    }
  }

  /* ---------- Toast ---------- */
  function showToast(message, type) {
    var container = $(".toast-container");
    if (!container) return;
    var icon = type === "success" ? "bi-check-circle-fill" : "bi-info-circle-fill";
    var el = document.createElement("div");
    el.className = "si-toast d-flex align-items-center gap-2 mb-2";
    el.innerHTML =
      '<i class="bi ' + icon + ' text-success" style="font-size:1.3rem"></i>' +
      '<span class="flex-grow-1 small">' + message + '</span>' +
      '<button type="button" class="btn-close btn-close-white" style="font-size:.7rem"></button>';
    container.appendChild(el);
    var hide = function () {
      el.style.transition = "opacity .4s";
      el.style.opacity = "0";
      setTimeout(function () { el.remove(); }, 400);
    };
    $(".btn-close", el).addEventListener("click", hide);
    setTimeout(hide, 3200);
  }

  /* ---------- Quantity steppers ---------- */
  function initQty() {
    $$(".qty-stepper").forEach(function (stepper) {
      var input = $("input", stepper);
      var dec = $(".qty-dec", stepper);
      var inc = $(".qty-inc", stepper);
      if (!input || !dec || !inc) return;
      dec.addEventListener("click", function () {
        var v = parseInt(input.value, 10) || 1;
        input.value = Math.max(1, v - 1);
      });
      inc.addEventListener("click", function () {
        var v = parseInt(input.value, 10) || 1;
        input.value = v + 1;
      });
      input.addEventListener("change", function () {
        var v = parseInt(input.value, 10) || 1;
        input.value = Math.max(1, v);
      });
    });
  }

  /* ---------- Menu filters (cards with data-category) ---------- */
  /* ---------- Pricing monthly/yearly billing toggle ---------- */
  function initBillingToggle() {
    var toggle = $("[data-billing-toggle]");
    if (!toggle) return;
    function apply(yearly) {
      $$("[data-price-monthly]").forEach(function (el) {
        el.textContent = yearly ? el.getAttribute("data-price-yearly") : el.getAttribute("data-price-monthly");
      });
      $$("[data-price-suffix]").forEach(function (el) {
        el.textContent = yearly ? "/yr" : "/mo";
      });
      $$("[data-billing-label]").forEach(function (el) {
        var isActive = (yearly && el.getAttribute("data-billing-label") === "yearly") ||
                        (!yearly && el.getAttribute("data-billing-label") === "monthly");
        el.classList.toggle("text-muted-soft", !isActive);
      });
    }
    toggle.addEventListener("change", function () {
      apply(toggle.checked);
    });
    apply(toggle.checked);
  }

  function initFilters() {
    var menuGrid = $("#menuGrid");
    if (menuGrid) {
      /* Menu filters are rendered as one coherent grid state. Filtering the
         column wrapper (not the inner card) prevents Bootstrap grid cells
         from remaining behind hidden products. */
      var menuPills = $$('[data-filter]');
      var cards = $$('[data-product]', menuGrid);
      var pageWrap = $('.si-pagination[data-target="#menuGrid"]');
      var pageSize = pageWrap ? (parseInt(pageWrap.getAttribute('data-page-size'), 10) || 8) : 8;
      var state = { filter: 'all', query: '', page: 0 };

      /* Check URL search params or hash for initial category */
      try {
        var urlParams = new URLSearchParams(window.location.search);
        var paramCat = (urlParams.get('category') || urlParams.get('filter') || '').toLowerCase().trim();
        if (!paramCat && window.location.hash) {
          paramCat = window.location.hash.replace('#', '').toLowerCase().trim();
        }
        if (paramCat) {
          var matchedPill = menuPills.find(function (p) {
            return (p.getAttribute('data-filter') || '').toLowerCase().trim() === paramCat;
          });
          if (matchedPill) {
            state.filter = paramCat;
            menuPills.forEach(function (p) { p.classList.toggle('active', p === matchedPill); });
          }
        }
      } catch (e) {}

      function cardCategory(card) {
        return (card.getAttribute('data-category') || '')
          .toLowerCase().trim().split(/\s+/).filter(Boolean);
      }

      function matches(card) {
        var categoryOK = state.filter === 'all' || cardCategory(card).indexOf(state.filter) !== -1;
        var haystack = (card.getAttribute('data-searchable') || card.textContent || '').toLowerCase();
        var searchOK = !state.query || haystack.indexOf(state.query) !== -1;
        return categoryOK && searchOK;
      }

      function wrapper(card) {
        return card.closest('.col') || card.parentElement;
      }

      function renderPages() {
        var matched = cards.filter(matches);
        var pages = Math.max(1, Math.ceil(matched.length / pageSize));
        if (state.page >= pages) state.page = 0;
        var start = state.page * pageSize;
        var end = start + pageSize;

        /* Hide all cards first */
        cards.forEach(function (card) {
          var col = wrapper(card);
          if (!col) return;
          col.style.display = 'none';
          col.setAttribute('data-menu-hidden', 'true');
        });

        /* Show matched cards for current page slice */
        matched.slice(start, end).forEach(function (card) {
          var col = wrapper(card);
          if (!col) return;
          col.style.display = '';
          col.removeAttribute('data-menu-hidden');
        });

        /* Render dynamic pagination */
        if (pageWrap) {
          pageWrap.innerHTML = '';
          if (pages > 1) {
            function scrollToMenu() {
              var gridTop = menuGrid.getBoundingClientRect().top + window.scrollY - 100;
              window.scrollTo({ top: Math.max(0, gridTop), behavior: 'smooth' });
            }

            /* Previous button */
            var prevBtn = document.createElement('button');
            prevBtn.type = 'button';
            prevBtn.className = 'si-page-btn si-page-prev page-link' + (state.page === 0 ? ' disabled' : '');
            prevBtn.textContent = 'Previous';
            prevBtn.setAttribute('aria-label', 'Go to previous page');
            if (state.page === 0) {
              prevBtn.disabled = true;
              prevBtn.setAttribute('aria-disabled', 'true');
            }
            prevBtn.addEventListener('click', function () {
              if (state.page > 0) {
                state.page--;
                renderPages();
                scrollToMenu();
              }
            });
            pageWrap.appendChild(prevBtn);

            /* Number buttons (1, 2, 3, 4...) */
            for (var i = 0; i < pages; i++) {
              (function (pageIndex) {
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'si-page-btn page-link' + (pageIndex === state.page ? ' active' : '');
                btn.textContent = String(pageIndex + 1);
                btn.setAttribute('aria-label', 'Go to menu page ' + (pageIndex + 1));
                btn.addEventListener('click', function () {
                  state.page = pageIndex;
                  renderPages();
                  scrollToMenu();
                });
                pageWrap.appendChild(btn);
              })(i);
            }

            /* Next button */
            var nextBtn = document.createElement('button');
            nextBtn.type = 'button';
            nextBtn.className = 'si-page-btn si-page-next page-link' + (state.page >= pages - 1 ? ' disabled' : '');
            nextBtn.textContent = 'Next';
            nextBtn.setAttribute('aria-label', 'Go to next page');
            if (state.page >= pages - 1) {
              nextBtn.disabled = true;
              nextBtn.setAttribute('aria-disabled', 'true');
            }
            nextBtn.addEventListener('click', function () {
              if (state.page < pages - 1) {
                state.page++;
                renderPages();
                scrollToMenu();
              }
            });
            pageWrap.appendChild(nextBtn);

            pageWrap.style.display = 'flex';
          } else {
            pageWrap.style.display = 'none';
          }
        }
      }

      menuPills.forEach(function (pill) {
        pill.addEventListener('click', function () {
          state.filter = (pill.getAttribute('data-filter') || 'all').toLowerCase().trim();
          state.page = 0;
          menuPills.forEach(function (p) { p.classList.toggle('active', p === pill); });
          renderPages();
        });
      });

      var input = $('[data-menu-search]');
      if (input) {
        input.addEventListener('input', function () {
          state.query = input.value.trim().toLowerCase();
          state.page = 0;
          renderPages();
        });
      }

      renderPages();
      return;
    }

    /* Generic filters used by pages other than Menu. */
    $$('[data-filter]').forEach(function (pill) {
      pill.addEventListener('click', function () {
        var filter = pill.getAttribute('data-filter');
        $$('[data-filter]').forEach(function (p) { p.classList.toggle('active', p === pill); });
        $$('[data-category]').forEach(function (card) {
          var categories = (card.getAttribute('data-category') || '').toLowerCase().split(/\s+/);
          var show = filter === 'all' || categories.indexOf(filter.toLowerCase()) !== -1;
          var col = card.closest('.col, [class*="col-"]');
          (col || card).style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---------- Blog filters + search + popular tags ---------- */
  function initBlogFilters() {
    var grid = $("#blogGrid");
    if (!grid) return;

    var categoryPills = $$("[data-blog-filter]", grid.parentElement || document);
    var tagPills = $$("[data-blog-tag], .blog-popular-tags a.filter-pill", grid.parentElement || document);
    var input = $("[data-blog-search]");
    var items = $$(".blog-grid-item", grid);
    var emptyState = $("#blogEmptyState");
    var emptyMessage = $("#blogEmptyMessage");
    var resetBtn = $("#blogResetBtn");

    function slugify(str) {
      return String(str || "")
        .toLowerCase()
        .trim()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    var state = {
      category: "all",
      tag: "all",
      query: ""
    };

    function readStateFromUrl() {
      var params = new URLSearchParams(window.location.search);
      var tagParam = slugify(params.get("tag") || "");
      var catParam = slugify(params.get("category") || params.get("cat") || "");
      var qParam = (params.get("q") || params.get("search") || "").trim().toLowerCase();

      if (tagParam && tagParam !== "all") {
        state.tag = tagParam;
        state.category = "all";
      } else if (catParam && catParam !== "all") {
        state.category = catParam;
        state.tag = "all";
      } else {
        state.tag = "all";
        state.category = "all";
      }

      state.query = qParam;
      if (input && qParam) {
        input.value = qParam;
      }
    }

    function updateUrl(push) {
      var params = new URLSearchParams();
      if (state.tag && state.tag !== "all") {
        params.set("tag", state.tag);
      } else if (state.category && state.category !== "all") {
        params.set("category", state.category);
      }
      if (state.query) {
        params.set("q", state.query);
      }

      var queryString = params.toString();
      var newUrl = window.location.pathname.split("/").pop() || "blog.html";
      newUrl = newUrl + (queryString ? "?" + queryString : "");

      try {
        if (push) {
          window.history.pushState({ tag: state.tag, category: state.category, query: state.query }, "", newUrl);
        } else {
          window.history.replaceState({ tag: state.tag, category: state.category, query: state.query }, "", newUrl);
        }
      } catch (e) {
        /* In restricted environments/sandboxes */
      }
    }

    function matches(item) {
      var card = $(".blog-card", item);
      if (!card) return false;

      var cardCategory = slugify(card.getAttribute("data-blog-category") || "");
      var rawTags = (card.getAttribute("data-blog-tags") || "").toLowerCase().split(/\s+/).map(slugify);
      var searchable = (
        card.getAttribute("data-blog-searchable") ||
        card.textContent ||
        ""
      ).toLowerCase();

      // Category check
      var categoryOK = true;
      if (state.category && state.category !== "all") {
        categoryOK = (cardCategory === state.category);
      }

      // Tag check
      var tagOK = true;
      if (state.tag && state.tag !== "all") {
        tagOK = (rawTags.indexOf(state.tag) !== -1 || cardCategory === state.tag);
      }

      // Query check
      var searchOK = !state.query || searchable.indexOf(state.query) !== -1;

      return categoryOK && tagOK && searchOK;
    }

    function render() {
      var visibleCount = 0;

      items.forEach(function (item) {
        var match = matches(item);
        item.style.display = match ? "" : "none";
        if (match) visibleCount++;
      });

      // Update category pills active state
      categoryPills.forEach(function (pill) {
        var val = slugify(pill.getAttribute("data-blog-filter") || "all");
        var isAllActive = (val === "all" && state.category === "all" && state.tag === "all");
        var isCategoryMatch = (val !== "all" && val === state.category);
        var isTagMatch = (val !== "all" && val === state.tag);
        pill.classList.toggle("active", isAllActive || isCategoryMatch || isTagMatch);
      });

      // Update tag pills active state
      tagPills.forEach(function (pill) {
        var tagVal = slugify(pill.getAttribute("data-blog-tag") || pill.textContent || "");
        var isTagMatch = (state.tag !== "all" && tagVal === state.tag);
        var isCategoryMatch = (state.category !== "all" && tagVal === state.category);
        pill.classList.toggle("active", isTagMatch || isCategoryMatch);
      });

      // Empty state
      if (emptyState) {
        if (visibleCount === 0) {
          emptyState.style.display = "block";
          if (emptyMessage) {
            if (state.tag && state.tag !== "all") {
              var displayTag = state.tag.replace(/-/g, " ");
              emptyMessage.textContent = 'No articles found with tag "' + displayTag.charAt(0).toUpperCase() + displayTag.slice(1) + '". Try selecting another tag or view all articles.';
            } else if (state.category && state.category !== "all") {
              emptyMessage.textContent = 'No articles found in category "' + state.category.charAt(0).toUpperCase() + state.category.slice(1) + '". Try selecting another category or view all articles.';
            } else if (state.query) {
              emptyMessage.textContent = 'No articles found matching "' + state.query + '". Try another search term.';
            } else {
              emptyMessage.textContent = 'No articles found matching the current criteria.';
            }
          }
        } else {
          emptyState.style.display = "none";
        }
      }
    }

    // Category pills click handlers
    categoryPills.forEach(function (pill) {
      pill.addEventListener("click", function (e) {
        e.preventDefault();
        var val = slugify(pill.getAttribute("data-blog-filter") || "all");
        state.category = val;
        state.tag = "all";
        render();
        updateUrl(true);
      });
    });

    // Tag pills click handlers
    tagPills.forEach(function (pill) {
      pill.addEventListener("click", function (e) {
        e.preventDefault();
        var val = slugify(pill.getAttribute("data-blog-tag") || pill.textContent || "");
        state.tag = val;
        state.category = "all";
        render();
        updateUrl(true);
      });
    });

    // Search input handler
    if (input) {
      input.addEventListener("input", function () {
        state.query = input.value.trim().toLowerCase();
        render();
        updateUrl(false);
      });
    }

    // Reset button handler
    if (resetBtn) {
      resetBtn.addEventListener("click", function (e) {
        e.preventDefault();
        state.category = "all";
        state.tag = "all";
        state.query = "";
        if (input) input.value = "";
        render();
        updateUrl(true);
      });
    }

    // Browser back/forward navigation support
    window.addEventListener("popstate", function () {
      readStateFromUrl();
      render();
    });

    // Initialize from URL
    readStateFromUrl();
    render();
  }

  /* Kept as a compatibility wrapper for pages/scripts that may call it directly. */
  function initBlogSearch() {
    /* Blog search is initialized together with category filtering above. */
  }

  /* ---------- Search input for menu products (data-searchable) ---------- */
  function initLiveSearch() {
    /* Menu search is managed together with category filtering in initFilters(). */
    if ($('#menuGrid')) return;
    var input = $('[data-menu-search]');
    if (!input) return;
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      $$('[data-searchable]').forEach(function (card) {
        var hay = (card.getAttribute('data-searchable') || card.textContent).toLowerCase();
        var col = card.closest('.col');
        (col || card).style.display = hay.indexOf(q) !== -1 ? '' : 'none';
      });
    });
  }

  /* ---------- Pagination (JS-driven, data-page) ---------- */
  function initPagination() {
    $$(".si-pagination").forEach(function (wrap) {
      if (wrap.getAttribute("data-target") === "#menuGrid") return;
      var pageSize = parseInt(wrap.getAttribute("data-page-size"), 10) || 6;
      var items = $$("[data-paginate]", wrap.getAttribute("data-target") ? $(wrap.getAttribute("data-target")) || document : document);
      var container = wrap.getAttribute("data-target") ? $(wrap.getAttribute("data-target")) : null;
      if (!container) return;
      var visible = $$("[data-paginate]", container);
      var pages = Math.max(1, Math.ceil(visible.length / pageSize));
      var current = 0;
      function show() {
        visible.forEach(function (el, i) {
          var on = i >= current * pageSize && i < (current + 1) * pageSize;
          el.closest(".col") ? (el.closest(".col").style.display = on ? "" : "none") : (el.style.display = on ? "" : "none");
        });
        $$(".si-page-btn", wrap).forEach(function (b, i) {
          b.classList.toggle("active", i === current);
        });
      }
      function build() {
        wrap.innerHTML = "";
        for (var i = 0; i < pages; i++) {
          var btn = document.createElement("button");
          btn.type = "button";
          btn.className = "si-page-btn page-link" + (i === current ? " active" : "");
          btn.textContent = i + 1;
          btn.addEventListener("click", function () { current = parseInt(this.textContent, 10) - 1; show(); window.scrollTo({ top: wrap.offsetTop - 120, behavior: "smooth" }); });
          wrap.appendChild(btn);
        }
      }
      build();
      show();
    });
  }

  /* ---------- Countdown timers ---------- */
  function initCountdowns() {
    $$("[data-countdown]").forEach(function (box) {
      var end = new Date(box.getAttribute("data-countdown")).getTime();
      if (isNaN(end)) return;
      var dEl = $(".cd-days", box), hEl = $(".cd-hours", box), mEl = $(".cd-mins", box), sEl = $(".cd-secs", box);
      function tick() {
        var diff = end - Date.now();
        if (diff <= 0) {
          box.setAttribute("data-expired", "true");
          $$(".countdown-item", box).forEach(function (it) { it.style.opacity = ".35"; });
          var done = $("[data-countdown-done]", box);
          if (done) done.style.display = "";
          return;
        }
        var d = Math.floor(diff / 86400000);
        var h = Math.floor((diff % 86400000) / 3600000);
        var m = Math.floor((diff % 3600000) / 60000);
        var s = Math.floor((diff % 60000) / 1000);
        if (dEl) dEl.textContent = String(d).padStart(2, "0");
        if (hEl) hEl.textContent = String(h).padStart(2, "0");
        if (mEl) mEl.textContent = String(m).padStart(2, "0");
        if (sEl) sEl.textContent = String(s).padStart(2, "0");
      }
      tick();
      setInterval(tick, 1000);
    });
  }

  /* ---------- Stat counters ---------- */
  function initCounters() {
    $$(".stat-num[data-target]").forEach(function (el) {
      var target = parseFloat(el.getAttribute("data-target"));
      var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
      var suffix = el.getAttribute("data-suffix") || "";
      var prefix = el.getAttribute("data-prefix") || "";
      var done = false;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || done) return;
          done = true;
          var start = performance.now();
          var dur = 1400;
          function step(now) {
            var p = Math.min(1, (now - start) / dur);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        });
      }, { threshold: 0.4 });
      io.observe(el);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var els = $$(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("revealed"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Back to top ---------- */
  function initBackToTop() {
    var btn = $(".back-to-top");
    if (!btn) return;
    window.addEventListener("scroll", function () {
      btn.classList.toggle("show", window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Form validation ---------- */
  function initForms() {
    $$("form[data-validate]:not([data-auth-form])").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var valid = true;
        $$("[required]", form).forEach(function (field) {
          var ok = field.value && field.value.trim().length > 0;
          if (field.type === "email") ok = ok && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
          field.classList.toggle("is-invalid", !ok);
          if (!ok) valid = false;
        });
        if (!valid) {
          var firstInvalid = $(".is-invalid", form);
          if (firstInvalid) firstInvalid.focus();
          showToast("Please fill in the highlighted fields.", "error");
          return;
        }
        var btn = $("[type=submit]", form);
        var original = btn ? btn.innerHTML : "";
        if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Submitting...'; }
        setTimeout(function () {
          var msg = form.getAttribute("data-success-message") || "Thanks! We'll get back to you shortly.";
          showToast(msg, "success");
          form.reset();
          $$(".is-invalid", form).forEach(function (f) { f.classList.remove("is-invalid"); });
          if (btn) { btn.disabled = false; btn.innerHTML = original; }
          var thanks = $("[data-form-success]", form);
          if (thanks) thanks.style.display = "";
        }, 1200);
      });
      $$("input, textarea", form).forEach(function (field) {
        field.addEventListener("input", function () { field.classList.remove("is-invalid"); });
      });
    });
  }

  /* ---------- Wishlist toggle ---------- */
  function initWishlist() {
    $$("[data-wishlist]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var active = btn.classList.toggle("active");
        btn.classList.toggle("text-danger", active);
        showToast(active ? "Added to your wishlist!" : "Removed from your wishlist.", "success");
      });
    });
  }

  /* ---------- Bulk / custom order amount sync ---------- */
  function initAmounts() {
    var qty = $("[data-bulk-qty]");
    var total = $("[data-bulk-total]");
    var rate = parseFloat(qty ? qty.getAttribute("data-rate") || "0" : "0");
    if (!qty || !total) return;
    var update = function () {
      var v = parseInt(qty.value, 10) || 1;
      var subtotal = v * rate;
      var disc = v >= 50 ? 0.1 : v >= 25 ? 0.05 : 0;
      total.textContent = "$" + (subtotal * (1 - disc)).toFixed(2);
    };
    qty.addEventListener("change", update);
    qty.addEventListener("keyup", update);
    update();
  }

  /* ---------- Bootstrap 5 + init ---------- */
  
  /* ---------- Product card navigation ---------- */
  function initProductCardNavigation() {
    $$(".product-card").forEach(function (card) {
      if (card.dataset.productNavigationBound === "true") return;
      var link = $(".product-title a[href*='product-details.html']", card);
      if (!link) return;
      card.dataset.productNavigationBound = "true";
      card.setAttribute("role", "link");
      card.setAttribute("tabindex", "0");
      card.addEventListener("click", function (event) {
        if (event.target.closest("button, a, input, select, textarea")) return;
        window.location.href = link.href;
      });
      card.addEventListener("keydown", function (event) {
        if ((event.key === "Enter" || event.key === " ") &&
            !event.target.closest("button, a, input, select, textarea")) {
          event.preventDefault();
          window.location.href = link.href;
        }
      });
    });
  }

  /* ---------- Blog card navigation ---------- */
  function initBlogCardNavigation() {
    $$(".blog-card").forEach(function (card) {
      if (card.dataset.blogNavigationBound === "true") return;
      var link = $(".blog-title a[href*='blog-details']", card);
      if (!link) return;
      card.dataset.blogNavigationBound = "true";
      card.setAttribute("role", "link");
      card.setAttribute("tabindex", "0");
      card.addEventListener("click", function (event) {
        if (event.target.closest("button, a, input, select, textarea")) return;
        window.location.href = link.href;
      });
      card.addEventListener("keydown", function (event) {
        if ((event.key === "Enter" || event.key === " ") &&
            !event.target.closest("button, a, input, select, textarea")) {
          event.preventDefault();
          window.location.href = link.href;
        }
      });
    });
  }

document.addEventListener("DOMContentLoaded", function () {
    initProductCardNavigation();
    initBlogCardNavigation();
    initTheme();
    initDirection();
    initNavbar();
    initHeroSlider();
    
    initCart();
    initQty();
    initProductView();
    initFilters();
    initBillingToggle();
    initBlogFilters();
    initBlogSearch();
    initLiveSearch();
    initPagination();
    initCountdowns();
    initCounters();
    initReveal();
    initBackToTop();
    initForms();
    initWishlist();
    initAmounts();
  });
})();
