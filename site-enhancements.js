(() => {
  "use strict";

  function initialiseMobileNavigation() {
    const navigation = document.querySelector("header .nav nav.menu");
    if (!navigation) return;

    if (!navigation.id) navigation.id = "site-primary-navigation";
    if (document.querySelector(".mobile-menu-toggle")) return;

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "mobile-menu-toggle";
    toggle.setAttribute("aria-controls", navigation.id);
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu de navegação");
    toggle.innerHTML = '<span class="mobile-menu-toggle__label">Menu</span><span class="mobile-menu-toggle__icon" aria-hidden="true"><i></i><i></i><i></i></span>';

    navigation.parentNode.insertBefore(toggle, navigation);

    function closeMenu() {
      navigation.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu de navegação");
    }

    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      navigation.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu de navegação" : "Abrir menu de navegação");
    });

    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (!navigation.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });
  }

  function identifyOperator(link) {
    const article = link.closest("article");
    if (article) {
      const className = article.className || "";
      if (className.includes("bradesco")) return "Bradesco Saúde";
      if (className.includes("amil")) return "Amil";
      if (className.includes("sulamerica")) return "SulAmérica";
      if (className.includes("unimed")) return "Seguros Unimed";
      if (className.includes("promedica")) return "Promédica";
      if (className.includes("hapvida")) return "Hapvida";
    }

    const text = (link.textContent || "").replace(/\s+/g, " ").trim();
    if (/bradesco/i.test(text)) return "Bradesco Saúde";
    if (/amil/i.test(text)) return "Amil";
    if (/sul.?am[eé]rica/i.test(text)) return "SulAmérica";
    if (/unimed/i.test(text)) return "Seguros Unimed";
    if (/prom[eé]dica/i.test(text)) return "Promédica";
    if (/hapvida/i.test(text)) return "Hapvida";

    const path = window.location.pathname.toLowerCase().replace(/\.html$/, "").replace(/\/$/, "");
    const pageOperators = {
      "/bradesco": "Bradesco Saúde",
      "/amil": "Amil",
      "/sulamerica": "SulAmérica",
      "/unimed": "Seguros Unimed",
      "/promedica": "Promédica",
      "/hapvida": "Hapvida"
    };
    return pageOperators[path] || "Cotação geral";
  }

  function pushWhatsAppEvent(link, source) {
    window.dataLayer = window.dataLayer || [];
    const label = (link && (link.textContent || link.getAttribute("aria-label")) || source || "WhatsApp")
      .replace(/\s+/g, " ").trim().slice(0, 120);

    window.dataLayer.push({
      event: "whatsapp_click",
      event_category: "lead",
      event_label: identifyOperator(link || document.body),
      operator_name: identifyOperator(link || document.body),
      page_path: window.location.pathname,
      link_text: label,
      link_url: link && link.href ? link.href : "formulario-whatsapp"
    });
  }

  function initialiseWhatsAppTracking() {
    document.addEventListener("click", (event) => {
      const link = event.target.closest('a[href*="wa.me"], a[href*="api.whatsapp.com"]');
      if (link) {
        pushWhatsAppEvent(link, "WhatsApp");
        return;
      }

      const button = event.target.closest("#whatsappQuoteButton");
      if (button) pushWhatsAppEvent(button, "Formulário - WhatsApp");
    }, true);
  }

  function initialise() {
    initialiseMobileNavigation();
    initialiseWhatsAppTracking();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialise, { once: true });
  } else {
    initialise();
  }
})();