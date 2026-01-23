"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Widget.module.css";
import attendant from "@/public/attendant.jpg";

const items = [
  {
    id: "trends",
    title: "Análise de Tendências",
    desc: "Identifique padrões nos seus dados financeiros",
    color: "green",
    progress: 85,
  },
  {
    id: "costs",
    title: "Otimização de Gastos",
    desc: "Sugestões para reduzir custos operacionais",
    color: "blue",
    progress: 60,
  },
  {
    id: "report",
    title: "Relatório Inteligente",
    desc: "Gere relatórios automáticos com insights",
    color: "teal",
    progress: 45,
  },
  {
    id: "alerts",
    title: "Alertas Financeiros",
    desc: "Receba avisos sobre anomalias detectadas",
    color: "red",
    progress: 30,
  },
];

type View = "menu" | "chat";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  time: string;
}

export default function Widget() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<View>("menu");
  const [activeItem, setActiveItem] = useState<(typeof items)[0] | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const now = () => {
    if (!mounted) return "";
    return new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const prevMessagesLenRef = useRef(0);

  useEffect(() => {
    if (messages.length !== prevMessagesLenRef.current) {
      prevMessagesLenRef.current = messages.length;
      scrollToBottom();
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };



  const handleItemClick = (item: (typeof items)[0]) => {
    setActiveItem(item);
    setView("chat");
    setIsTyping(true);
    setMessages([]);

    setTimeout(() => {
      setIsTyping(false);
      setMessages([
        {
          id: 1,
          text: `Olá! Sou a Ana, sua assistente de ${item.title}. 😊`,
          sender: "bot",
          time: now(),
        },
      ]);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: 2,
            text: "Como posso ajudar você hoje? Estou aqui para tornar sua experiência mais fácil e produtiva!",
            sender: "bot",
            time: now(),
          },
        ]);
      }, 800);
    }, 1500);
  };

  const handleBack = () => {
    setView("menu");
    setActiveItem(null);
    setMessages([]);
    setInput("");
    setIsTyping(false);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      time: now(),
    };

    setMessages([...messages, newMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botResponse: Message = {
        id: messages.length + 2,
        text: "Entendi sua solicitação! Estou analisando os dados para fornecer a melhor resposta possível. Um momento, por favor...",
        sender: "bot",
        time: now(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setView("menu");
      setActiveItem(null);
      setMessages([]);
      setInput("");
      setIsTyping(false);
    }, 300);
  };

  return (
    <div className={styles.stage}>
      {/* Card do Widget */}
      <div
        className={`${styles.card} ${isOpen ? styles.cardOpen : styles.cardClosed
          }`}
      >
        {view === "menu" ? (
          <>
            {/* Header Menu */}
            <header className={styles.header}>
              <div className={styles.headerIcon}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className={styles.headerText}>
                <div className={styles.title}>Assistente IA Financeiro</div>
                <div className={styles.subtitle}>Como posso ajudar?</div>
              </div>
            </header>

            <div className={styles.divider} />

            {/* Lista */}
            <div className={styles.list}>
              {items.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={styles.item}
                  onClick={() => handleItemClick(item)}
                >
                  <div className={`${styles.icon} ${styles[item.color]}`}>
                    {item.color === "green" && (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    )}
                    {item.color === "blue" && (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    )}
                    {item.color === "teal" && (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6" />
                        <path d="M16 13H8" />
                        <path d="M16 17H8" />
                        <path d="M10 9H8" />
                      </svg>
                    )}
                    {item.color === "red" && (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    )}
                  </div>

                  <div className={styles.text}>
                    <strong>{item.title}</strong>
                    <span>{item.desc}</span>
                  </div>

                  <div className={styles.progressBar}>
                    <div
                      className={`${styles.progressFill} ${styles[`${item.color}Bar`]
                        }`}
                      style={{ height: `${item.progress}%` }}
                    />
                  </div>
                </button>
              ))}
            </div>

            {/* Footer */}
            <footer className={styles.footer}>
              <button type="button" className={styles.link}>
                Ver todas as funcionalidades
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </footer>
          </>
        ) : (
          <>
            {/* Chat Header */}
            <header className={styles.chatHeader}>
              <button
                type="button"
                className={styles.backButton}
                onClick={handleBack}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>

              <div className={styles.chatAvatarWrapper}>
                {/* ✅ IMAGEM padronizada via import */}
                <Image
                  src={attendant}
                  alt="Ana"
                  width={48}
                  height={48}
                  className={styles.chatAvatarImage}
                  priority
                />
                <span className={styles.onlineBadge} />
              </div>

              <div className={styles.chatHeaderText}>
                <div className={styles.chatTitle}>Ana</div>
                <div className={styles.chatStatus}>
                  <span className={styles.statusDot} />
                  Online agora
                </div>
              </div>

              <button
                type="button"
                className={styles.closeButton}
                onClick={handleClose}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </header>

            {/* Chat Messages */}
            <div className={styles.chatMessages}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`${styles.message} ${msg.sender === "user"
                      ? styles.userMessage
                      : styles.botMessage
                    }`}
                >
                  {msg.sender === "bot" && (
                    <div className={styles.messageBotAvatar}>
                      {/* ✅ IMAGEM padronizada via import */}
                      <Image
                        src={attendant}
                        alt="Ana"
                        width={32}
                        height={32}
                        className={styles.messageBotAvatarImage}
                      />
                    </div>
                  )}

                  <div className={styles.messageContent}>
                    <p>{msg.text}</p>

                    {/* ✅ Evita hydration mismatch: só mostra se tiver time */}
                    {msg.time && (
                      <span className={styles.messageTime}>{msg.time}</span>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className={`${styles.message} ${styles.botMessage}`}>
                  <div className={styles.messageBotAvatar}>
                    {/* ✅ IMAGEM padronizada via import */}
                    <Image
                      src={attendant}
                      alt="Ana"
                      width={32}
                      height={32}
                      className={styles.messageBotAvatarImage}
                    />
                  </div>
                  <div
                    className={`${styles.messageContent} ${styles.typingIndicator}`}
                  >
                    <div className={styles.typingDots}>
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className={styles.chatInputWrapper}>
              <div className={styles.chatInputContainer}>
                <button type="button" className={styles.attachButton}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                </button>

                <input
                  type="text"
                  className={styles.chatInput}
                  placeholder="Digite sua mensagem..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                />

                <button
                  type="button"
                  className={`${styles.sendButton} ${input.trim() ? styles.sendButtonActive : ""
                    }`}
                  onClick={handleSend}
                  disabled={!input.trim()}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>

              <div className={styles.chatFooter}>
                Powered by <span>IA Financeiro</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Botão flutuante */}
      <button
        type="button"
        className={`${styles.fab} ${isOpen ? styles.fabOpen : ""}`}
        onClick={() => (isOpen ? handleClose() : setIsOpen(true))}
        aria-label={isOpen ? "Fechar assistente" : "Abrir assistente"}
      >
        {isOpen ? (
          <svg
            className={styles.fabIcon}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            className={styles.fabIcon}
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Label do FAB quando fechado */}
      {!isOpen && (
        <div className={styles.fabLabel}>
          <span className={styles.fabLabelText}>Assistente IA</span>
          <span className={styles.fabLabelSubtext}>Online agora</span>
        </div>
      )}
    </div>
  );
}
