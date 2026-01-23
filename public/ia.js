(function () {
  var script = document.currentScript;
  if (!script) return;

  var color = script.getAttribute("data-color") || undefined;
  var logo = script.getAttribute("data-logo") || undefined;

  var agentsRaw = script.getAttribute("data-agents") || "";
  var agents = agentsRaw
    ? agentsRaw.split(",").map(function (s) { return s.trim(); }).filter(Boolean)
    : undefined;

  console.log("[IA Widget] loader ok", { color: color, logo: logo, agents: agents });

  // Container fixo
  var host = document.createElement("div");
  host.id = "ia-widget-host";
  host.style.position = "fixed";
  host.style.right = "16px";
  host.style.bottom = "16px";
  host.style.zIndex = "2147483647";
  document.body.appendChild(host);

  // Shadow DOM (isola CSS do site do cliente)
  var root = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;

  // Mount point
  var mountPoint = document.createElement("div");
  mountPoint.id = "ia-widget-root";
  root.appendChild(mountPoint);

  // CSS do widget (ARQUIVO REAL)
  var css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = new URL("widget-entry.css", script.src).toString();
  root.appendChild(css);

  // Bundle do widget (ARQUIVO REAL)
  var js = document.createElement("script");
  js.src = new URL("widget-entry.iife.js", script.src).toString();
  js.async = true;

  js.onload = function () {
    console.log("[IA Widget] bundle carregou");

    if (!window.IAWidget || !window.IAWidget.mount) {
      console.error("[IA Widget] window.IAWidget.mount não encontrado");
      return;
    }

    window.IAWidget.mount(mountPoint, {
      color: color,
      logo: logo,
      agents: agents
    });

    console.log("[IA Widget] mount OK");
  };

  js.onerror = function () {
    console.error("[IA Widget] falha ao carregar bundle:", js.src);
  };

  document.head.appendChild(js);
})();
