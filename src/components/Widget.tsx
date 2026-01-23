"use client";

import React from "react"

import { useState, useRef, useEffect } from "react";
import styles from "./Widget.module.css";

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
  const [activeItem, setActiveItem] = useState<typeof items[0] | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleItemClick = (item: typeof items[0]) => {
    setActiveItem(item);
    setView("chat");
    setMessages([
      {
        id: 1,
        text: `Olá! Sou o assistente de ${item.title}. Como posso ajudar você hoje?`,
        sender: "bot",
        time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const handleBack = () => {
    setView("menu");
    setActiveItem(null);
    setMessages([]);
    setInput("");
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    };
    
    setMessages([...messages, newMessage]);
    setInput("");

    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: "Entendi sua solicitação. Estou analisando os dados para fornecer a melhor resposta possível.",
        sender: "bot",
        time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
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
    }, 300);
  };

  return (
    <div className={styles.stage}>
      {/* Card do Widget */}
      <div className={`${styles.card} ${isOpen ? styles.cardOpen : styles.cardClosed}`}>
        {view === "menu" ? (
          <>
            <header className={styles.header}>
              <div className={styles.headerIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.headerText}>
                <div className={styles.title}>Assistente IA Financeiro</div>
                <div className={styles.subtitle}>Como posso ajudar?</div>
              </div>
            </header>

            <div className={styles.divider} />

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
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                      </svg>
                    )}
                    {item.color === "blue" && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 6v6l4 2"/>
                      </svg>
                    )}
                    {item.color === "teal" && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <path d="M14 2v6h6"/>
                        <path d="M16 13H8"/>
                        <path d="M16 17H8"/>
                        <path d="M10 9H8"/>
                      </svg>
                    )}
                    {item.color === "red" && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                    )}
                  </div>

                  <div className={styles.text}>
                    <strong>{item.title}</strong>
                    <span>{item.desc}</span>
                  </div>

                  <div className={styles.progressBar}>
                    <div 
                      className={`${styles.progressFill} ${styles[`${item.color}Bar`]}`}
                      style={{ height: `${item.progress}%` }}
                    />
                  </div>
                </button>
              ))}
            </div>
            <footer className={styles.footer}>
              <button type="button" className={styles.link}>
                Ver todas as funcionalidades
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </footer>
          </>
        ) : (
          <>
            <header className={styles.chatHeader}>
              <button type="button" className={styles.backButton} onClick={handleBack}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>
              <div className={`${styles.chatAvatar} ${styles[activeItem?.color || "blue"]}`}>
                {activeItem?.color === "green" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                )}
                {activeItem?.color === "blue" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                )}
                {activeItem?.color === "teal" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <path d="M14 2v6h6"/>
                  </svg>
                )}
                {activeItem?.color === "red" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                )}
              </div>
              <div className={styles.chatHeaderText}>
                <div className={styles.chatTitle}>{activeItem?.title}</div>
                <div className={styles.chatStatus}>
                  <span className={styles.statusDot} />
                  Online
                </div>
              </div>
              <button type="button" className={styles.closeButton} onClick={handleClose}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </header>

            <div className={styles.chatMessages}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`${styles.message} ${msg.sender === "user" ? styles.userMessage : styles.botMessage}`}
                >
                  <div className={styles.messageContent}>
                    <p>{msg.text}</p>
                    <span className={styles.messageTime}>{msg.time}</span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className={styles.chatInputWrapper}>
              <div className={styles.chatInputContainer}>
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
                  className={`${styles.sendButton} ${input.trim() ? styles.sendButtonActive : ""}`}
                  onClick={handleSend}
                  disabled={!input.trim()}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
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

      <button 
        type="button"
        className={`${styles.fab} ${isOpen ? styles.fabOpen : ""}`}
        onClick={() => isOpen ? handleClose() : setIsOpen(true)}
        aria-label={isOpen ? "Fechar assistente" : "Abrir assistente"}
      >
        <svg 
          className={styles.fabIcon} 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5"
        >
          {isOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </>
          ) : (
            <>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </>
          )}
        </svg>
      </button>

      {!isOpen && (
        <div className={styles.fabLabel}>
          Seu colega de equipe de IA
        </div>
      )}
    </div>
  );
}
