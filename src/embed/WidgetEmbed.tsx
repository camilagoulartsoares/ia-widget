import React, { useEffect, useRef, useState } from "react";
import "./widget.css"; // <-- CSS PURO (sem :global)

type ItemColor = "green" | "blue" | "teal" | "red";

const items = [
  { id: "trends", title: "Análise de Tendências", desc: "Identifique padrões nos seus dados financeiros", color: "green", progress: 85 },
  { id: "costs", title: "Otimização de Gastos", desc: "Sugestões para reduzir custos operacionais", color: "blue", progress: 60 },
  { id: "report", title: "Relatório Inteligente", desc: "Gere relatórios automáticos com insights", color: "teal", progress: 45 },
  { id: "alerts", title: "Alertas Financeiros", desc: "Receba avisos sobre anomalias detectadas", color: "red", progress: 30 },
] as const;

type Item = (typeof items)[number];
type View = "menu" | "chat";

export type WidgetOptions = {
  color?: string;
  logo?: string;
  agents?: string[];
  assetBase?: string;
};

function joinBase(base: string | undefined, file: string) {
  if (!base) return `/${file}`;
  return new URL(file, base.endsWith("/") ? base : base + "/").toString();
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  time: string;
}

export default function WidgetEmbed(props: WidgetOptions) {
  const attendantUrl = joinBase(props.assetBase, "attendant.jpg");

  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<View>("menu");
  const [activeItem, setActiveItem] = useState<Item | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const now = () =>
    new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isTyping]);

  const handleItemClick = (item: Item) => {
    setActiveItem(item);
    setView("chat");
    setIsTyping(true);
    setMessages([]);

    setTimeout(() => {
      setIsTyping(false);
      setMessages([{ id: 1, text: `Olá! Sou a Ana, sua assistente de ${item.title}. 😊`, sender: "bot", time: now() }]);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: 2, text: "Como posso ajudar você hoje? Estou aqui para tornar sua experiência mais fácil e produtiva!", sender: "bot", time: now() },
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

    const newMessage: Message = { id: messages.length + 1, text: input, sender: "user", time: now() };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: "Entendi sua solicitação! Estou analisando os dados para fornecer a melhor resposta possível. Um momento, por favor...", sender: "bot", time: now() },
      ]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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
    <div className="iaStage">
      <div className={`iaCard ${isOpen ? "iaCardOpen" : "iaCardClosed"}`}>
        {view === "menu" ? (
          <>
            <header className="iaHeader">
              <div className="iaHeaderIcon">
                {/* ...seu svg... */}
              </div>
              <div className="iaHeaderText">
                <div className="iaTitle">Assistente IA Financeiro</div>
                <div className="iaSubtitle">Como posso ajudar?</div>
              </div>
            </header>

            <div className="iaDivider" />

            <div className="iaList">
              {items.map((item) => (
                <button key={item.id} type="button" className="iaItem" onClick={() => handleItemClick(item)}>
                  <div className={`iaIcon iaIcon_${item.color as ItemColor}`} />
                  <div className="iaText">
                    <strong>{item.title}</strong>
                    <span>{item.desc}</span>
                  </div>
                  <div className="iaProgressBar">
                    <div className={`iaProgressFill iaProgress_${item.color as ItemColor}`} style={{ height: `${item.progress}%` }} />
                  </div>
                </button>
              ))}
            </div>

            <footer className="iaFooter">
              <button type="button" className="iaLink">Ver todas as funcionalidades</button>
            </footer>
          </>
        ) : (
          <>
            <header className="iaChatHeader">
              <button type="button" className="iaBackButton" onClick={handleBack}>←</button>

              <div className="iaChatAvatarWrapper">
                <img src={attendantUrl} className="iaChatAvatarImage" alt="Ana" />
                <span className="iaOnlineBadge" />
              </div>

              <div className="iaChatHeaderText">
                <div className="iaChatTitle">Ana</div>
                <div className="iaChatStatus"><span className="iaStatusDot" /> Online agora</div>
              </div>

              <button type="button" className="iaCloseButton" onClick={handleClose}>×</button>
            </header>

            <div className="iaChatMessages">
              {messages.map((msg) => (
                <div key={msg.id} className={`iaMessage ${msg.sender === "user" ? "iaUserMessage" : "iaBotMessage"}`}>
                  {msg.sender === "bot" && (
                    <div className="iaMessageBotAvatar">
                      <img src={attendantUrl} className="iaMessageBotAvatarImage" alt="Ana" />
                    </div>
                  )}
                  <div className="iaMessageContent">
                    <p>{msg.text}</p>
                    <span className="iaMessageTime">{msg.time}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="iaMessage iaBotMessage">
                  <div className="iaMessageBotAvatar">
                    <img src={attendantUrl} className="iaMessageBotAvatarImage" alt="Ana" />
                  </div>
                  <div className="iaMessageContent iaTypingIndicator">
                    <div className="iaTypingDots"><span /><span /><span /></div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="iaChatInputWrapper">
              <div className="iaChatInputContainer">
                <input
                  className="iaChatInput"
                  value={input}
                  placeholder="Digite sua mensagem..."
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button className={`iaSendButton ${input.trim() ? "iaSendButtonActive" : ""}`} onClick={handleSend} disabled={!input.trim()}>
                  ➤
                </button>
              </div>

              <div className="iaChatFooter">Powered by <span>IA Financeiro</span></div>
            </div>
          </>
        )}
      </div>

      <button className={`iaFab ${isOpen ? "iaFabOpen" : ""}`} onClick={() => (isOpen ? handleClose() : setIsOpen(true))}>
        {isOpen ? "×" : "💬"}
      </button>

      {!isOpen && (
        <div className="iaFabLabel">
          <span className="iaFabLabelText">Assistente IA</span>
          <span className="iaFabLabelSubtext">Online agora</span>
        </div>
      )}
    </div>
  );
}
