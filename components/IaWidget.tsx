"use client";

import React, { useState, FormEvent } from "react";

type Message = {
  id: number;
  from: "user" | "bot";
  text: string;
};

const IaWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const quickReplies = [
    "I'm prepared and eager to start",
    "Can you send me the new task?",
    "Thank you!",
  ];

  function handleSend(event: FormEvent) {
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
      text: "Soon DealSafe will help you review and protect your deals automatically. 😊",
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, botMessage]);
    }, 400);
  }

  function handleQuickReply(text: string) {
    setInput(text);
  }

  return (
    <div className="ia-widget-container">
      {isOpen && (
        <div className="dealsafe-panel">
          <header className="dealsafe-header">
            <span className="dealsafe-title">DealSafe</span>

            <div className="dealsafe-header-right">
              <span className="dealsafe-pill">Today</span>
              <button type="button" className="dealsafe-icon-btn">
                ⋯
              </button>
            </div>
          </header>

          <div className="dealsafe-content">
            <div className="dealsafe-avatar-wrapper">
              <div className="dealsafe-avatar">
                <span className="dealsafe-avatar-wave" />
              </div>
            </div>

            <p className="dealsafe-main-text">
              Good morning, are you ready to make safer deals?{" "}
              <br />
              Today is important for you.
            </p>

            <span className="dealsafe-time">08:05</span>

            <div className="dealsafe-quick-replies">
              {quickReplies.map((qr) => (
                <button
                  key={qr}
                  type="button"
                  className="dealsafe-chip"
                  onClick={() => handleQuickReply(qr)}
                >
                  {qr}
                </button>
              ))}
            </div>

            <div className="dealsafe-messages">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={
                    msg.from === "user"
                      ? "dealsafe-message dealsafe-message-user"
                      : "dealsafe-message dealsafe-message-bot"
                  }
                >
                  {msg.text}
                </div>
              ))}
            </div>
          </div>

          <form className="dealsafe-input-bar" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Write your answer..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="dealsafe-input"
            />

            <button type="submit" className="dealsafe-launch-btn">
              Launch app
            </button>
          </form>
        </div>
      )}

      {/* Botão bolinha flutuante que abre/fecha o widget */}
      <button
        type="button"
        className="dealsafe-fab"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        DS
      </button>
    </div>
  );
};

export default IaWidget;
