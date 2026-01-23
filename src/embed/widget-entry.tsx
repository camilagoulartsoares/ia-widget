import React from "react";
import { createRoot } from "react-dom/client";
import Widget from "@/components/Widget";

type WidgetConfig = {
  color?: string;
  logo?: string;
  agents?: string[];
};

declare global {
  interface Window {
    IAWidget?: {
      mount: (el: HTMLElement, config: WidgetConfig) => void;
      unmount: (el: HTMLElement) => void;
    };
  }
}

function mount(el: HTMLElement, config: WidgetConfig) {
  // Tema via CSS vars (recomendado)
  if (config?.color) el.style.setProperty("--ia-primary", config.color);
  if (config?.logo) el.style.setProperty("--ia-logo", `url(${config.logo})`);

  const root = createRoot(el);
  root.render(<Widget />);
  (el as any).__ia_root = root;
}

function unmount(el: HTMLElement) {
  const root = (el as any).__ia_root;
  if (root) root.unmount();
}

window.IAWidget = { mount, unmount };
