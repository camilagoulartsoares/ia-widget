"use client";

import styles from "./Widget.module.css";

const items = [
  {
    title: "Análise de Tendências",
    desc: "Identifique padrões nos seus dados financeiros",
    color: "green",
    icon: "📈",
  },
  {
    title: "Otimização de Gastos",
    desc: "Sugestões para reduzir custos operacionais",
    color: "blue",
    icon: "💰",
  },
  {
    title: "Relatório Inteligente",
    desc: "Gere relatórios automáticos com insights",
    color: "teal",
    icon: "📄",
  },
  {
    title: "Alertas Financeiros",
    desc: "Receba avisos sobre anomalias detectadas",
    color: "red",
    icon: "⏰",
  },
];

export default function Widget() {
  return (
    <div className={styles.stage}>
      <div className={styles.card}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerIcon}>🤖</div>
          <div>
            <div className={styles.title}>Assistente IA Financeiro</div>
            <div className={styles.subtitle}>Como posso ajudar?</div>
          </div>
        </header>

        <div className={styles.divider} />

        {/* Lista */}
        <div className={styles.list}>
          {items.map((item) => (
            <div key={item.title} className={styles.item}>
              <div className={`${styles.icon} ${styles[item.color]}`}>
                {item.icon}
              </div>

              <div className={styles.text}>
                <strong>{item.title}</strong>
                <span>{item.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className={styles.footer}>
          <button className={styles.link}>
            Ver todas as funcionalidades →
          </button>
        </footer>
      </div>

      {/* Botão flutuante */}
      <button className={styles.fab}>✕</button>
    </div>
  );
}
