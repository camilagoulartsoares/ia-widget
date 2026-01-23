"use client";

import { useState } from "react";
import styles from "./Widget.module.css";

const items = [
  {
    title: "Análise de Tendências",
    desc: "Identifique padrões nos seus dados financeiros",
    color: "green",
    progress: 85,
  },
  {
    title: "Otimização de Gastos",
    desc: "Sugestões para reduzir custos operacionais",
    color: "blue",
    progress: 60,
  },
  {
    title: "Relatório Inteligente",
    desc: "Gere relatórios automáticos com insights",
    color: "teal",
    progress: 45,
  },
  {
    title: "Alertas Financeiros",
    desc: "Receba avisos sobre anomalias detectadas",
    color: "red",
    progress: 30,
  },
];

export default function Widget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.stage}>
      <div className={`${styles.card} ${isOpen ? styles.cardOpen : styles.cardClosed}`}>
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
            <div key={item.title} className={styles.item}>
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
            </div>
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
      </div>

      <button 
        type="button"
        className={`${styles.fab} ${isOpen ? styles.fabOpen : ""}`}
        onClick={() => setIsOpen(!isOpen)}
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
