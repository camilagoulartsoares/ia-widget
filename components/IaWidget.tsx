"use client";

import React, { useState, FormEvent } from "react";

type Message = {
  id: number;
  from: "user" | "bot";
  text: string;
};

const IaWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: "bot", text: "Oi! Eu sou seu widget de IA. Como posso te ajudar?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (event: FormEvent) => {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now(),
      from: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const botMessage: Message = {
      id: Date.now() + 1,
      from: "bot",
      text: "Sou só o front ainda 😊, mas em breve posso responder com IA de verdade.",
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, botMessage]);
    }, 400);
  };

  return (
    <div className="ia-widget-container">
      {isOpen && (
        <div className="ia-widget-window">
          <header className="ia-widget-header">
            <span>Assistente IA</span>
            <button
              type="button"
              className="ia-widget-close"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </header>

          <div className="ia-widget-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={
                  msg.from === "user"
                    ? "ia-widget-message ia-widget-message-user"
                    : "ia-widget-message ia-widget-message-bot"
                }
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form className="ia-widget-input-area" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="ia-widget-input"
            />
            <button type="submit" className="ia-widget-send">
              Enviar
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className="ia-widget-fab"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? "Fechar" : "IA"}
      </button>
    </div>
  );
};

export default IaWidget;
