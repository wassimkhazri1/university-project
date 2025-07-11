import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { X } from "lucide-react";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}>
      {/* Bouton d'ouverture du chat */}
      {!isOpen && (
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          💬 Chat
        </Button>
      )}
{/* 
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
*/}
      {/* Fenêtre du chat */}
      {isOpen && (
        <Card style={{ width: "300px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}>
          <Card.Header className="d-flex justify-content-between">
            <span>💬 Chat Support</span>
            <X onClick={() => setIsOpen(false)} style={{ cursor: "pointer" }} />
          </Card.Header>
          <Card.Body>
            <p>Hello! How can I help you today?</p>
            <input type="text" className="form-control" placeholder="Type a message..." />
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default ChatWidget;