import React from "react";
import { createRoot } from "react-dom/client";
import WidgetEmbed from "./WidgetEmbed"; // ou seu componente do embed
import type { WidgetOptions } from "./WidgetEmbed";

export function mount(el: HTMLElement, options: WidgetOptions = {}) {
  const root = createRoot(el);
  root.render(<WidgetEmbed {...options} />);
}
