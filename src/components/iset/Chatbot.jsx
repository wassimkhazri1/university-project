import React, { useState, useEffect } from "react";
import { MessageCircle, Send, X, Loader2 } from "lucide-react";
import "./Chatbot.css";

function Chatbot() {
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "👋 Bonjour ! Je suis l’assistant de l’ISET Jendouba.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Apparition du bouton après scroll
  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/chatbot/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.text();
      setMessages((prev) => [...prev, { role: "bot", text: data }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "⚠️ Oups, problème technique. Réessaye plus tard !",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Fenêtre overlay moderne */}
      {isOpen && (
        <div className="chat-overlay">
          <div className="chat-header">
            <span>Assistant ISETJ</span>
            <button
              onClick={() => setIsOpen(false)}
              className="btn-close  w-8 h-8 flex items-center justify-center rounded-full hover:btn-close-white transition-colors duration-200"
              aria-label="Fermer le chat"
            >
              <X size={24} className="text-white" />
            </button>
          </div>
          <div className="chat-body">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-bubble ${msg.role === "user" ? "user" : "bot"}`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <Loader2 className="animate-spin text-blue-600" size={20} />
            )}
          </div>
          <div className="chat-footer">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Posez votre question..."
            />
            <button onClick={handleSend}>
              <Send size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Bouton flottant */}
      {visible && (
        <button className="chatbot-button" onClick={() => setIsOpen(true)}>
          <MessageCircle size={28} />
        </button>
      )}
    </>
  );
}

export default Chatbot;
