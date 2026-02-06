import React, { useState, useEffect } from "react";
import { Bell, CheckCircle, X } from "lucide-react";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpen, faTrash } from "@fortawesome/free-solid-svg-icons";

import useWebSocketNotifications from "../hooks/useWebSocketNotifications";
import "./NotificationBell.css";

const NotificationBell = ({ userId, isAuthenticated, userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const [openMenuId, setOpenMenuId] = useState(false);

  // Hook WebSocket
  const { sendNotificationRead } = useWebSocketNotifications(
    userId,
    handleNewNotification,
  );
  const { deleteNotification } = useWebSocketNotifications(userId);

  const { clearNotification } = useWebSocketNotifications(userId);

  // Nouvelle notification reçue
  function handleNewNotification(notification) {
    const newNotification = {
      id: notification.id || crypto.randomUUID(), // ID unique
      type: notification.type,
      message: notification.message,
      date: notification.date,
      timestamp: notification.timestamp || new Date().toISOString(),
      read: false,
      data: notification,
    };

    setNotifications((prev) => [newNotification, ...prev]);
    setUnreadCount((prev) => prev + 1);

    // Feedback utilisateur
    toast(notification.message, { icon: "🔔" });
  }

  // Marquer une notification comme lue
  const handleMarkAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif,
      ),
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
    sendNotificationRead(notificationId);
  };

  const onDelete = (notificationId) => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif })));
    deleteNotification(notificationId);
  };

  // Tout marquer comme lu
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
    setUnreadCount(0);
    notifications
      .filter((notif) => !notif.read)
      .forEach((notif) => sendNotificationRead(notif.id));
  };

  // Effacer toutes les notifications
  const handleClearAll = () => {
    clearNotification(userId);
    setNotifications([]);
    setUnreadCount(0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Charger les notifications existantes
  useEffect(() => {
    if (!isAuthenticated || !userId) return;

    const fetchExistingNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8080/api/notifications/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (response.ok) {
          const existingNotifications = await response.json();
          setNotifications(
            existingNotifications.map((notif) => ({
              ...notif,
              id: notif.id || crypto.randomUUID(),
              read: notif.read || false,
            })),
          );
          setUnreadCount(existingNotifications.filter((n) => !n.read).length);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des notifications:",
          error,
        );
      }
    };

    fetchExistingNotifications();
  }, [isAuthenticated, userId, userRole]);

  return (
    <>
      <div
        className="notification-bell-container"
        style={{ position: "relative" }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-link"
          style={{
            background: "none",
            border: "none",
            color: "#6c757d",
            padding: "8px",
            position: "relative",
            cursor: "pointer",
          }}
          aria-label="Notifications"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                background: "#dc3545",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "11px",
                fontWeight: "bold",
                minWidth: "18px",
                height: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {isOpen && (
          <div
            role="menu"
            style={{
              position: "absolute",
              top: "100%",
              right: "0",
              width: "350px",
              maxWidth: "90vw",
              background: "white",
              borderRadius: "8px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
              border: "1px solid #dee2e6",
              zIndex: 1050,
              marginTop: "10px",
              animation: "fadeIn 0.3s ease-in-out",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "15px 20px",
                borderBottom: "1px solid #dee2e6",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h6 style={{ margin: 0, fontWeight: "600" }}>Notifications</h6>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#6c757d",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      cursor: "pointer",
                    }}
                  >
                    <CheckCircle size={14} />
                    <span>Tout lire</span>
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#6c757d",
                    cursor: "pointer",
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Liste */}
            <div
              style={{ maxHeight: "400px", overflowY: "auto" }}
              aria-live="polite"
            >
              {notifications.length === 0 ? (
                <div
                  style={{
                    padding: "40px 20px",
                    textAlign: "center",
                    color: "#adb5bd",
                  }}
                >
                  <Bell size={32} />
                  <p style={{ marginTop: "10px", marginBottom: 0 }}>
                    Aucune notification
                  </p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    role="menuitem"
                    style={{
                      padding: "15px 20px",
                      borderBottom: "1px solid #f8f9fa",
                      cursor: "pointer",
                      backgroundColor: notification.read ? "white" : "#f0f7ff",
                      transition: "background-color 0.2s",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background: getNotificationColor(notification.type)
                            .background,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: getNotificationColor(notification.type).color,
                          flexShrink: 0,
                        }}
                      >
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div
                        style={{ flex: 1 }}
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <p
                          style={{
                            fontWeight: "600",
                            margin: "0 0 5px 0",
                            fontSize: "14px",
                          }}
                        >
                          {getNotificationTitle(notification.type)}
                        </p>
                        <p
                          style={{
                            color: "#6c757d",
                            fontSize: "13px",
                            margin: "0 0 5px 0",
                          }}
                        >
                          {notification.message}
                        </p>
                        <p
                          style={{
                            color: "#adb5bd",
                            fontSize: "11px",
                            margin: 0,
                          }}
                        >
                          {formatDate(notification.timestamp)}
                        </p>
                      </div>

                      {!notification.read && (
                        <div
                          style={{
                            width: "8px",
                            height: "8px",
                            background: "#007bff",
                            borderRadius: "50%",
                            marginTop: "12px",
                          }}
                        />
                      )}

                      {/* Menu bouton */}
                      <div
                        className="notification-menu"
                        style={{ marginLeft: "auto" }}
                      >
                        <button
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId === notification.id
                                ? null
                                : notification.id,
                            )
                          }
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                          }}
                        >
                          ⋮
                        </button>
                        {openMenuId === notification.id && (
                          <ul className="menu-dropdown">
                            <li
                              onClick={() => handleMarkAsRead(notification.id)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                cursor: "pointer",
                                padding: "8px",
                                color: "#007bff", // bleu pour l’enveloppe
                              }}
                            >
                              <FontAwesomeIcon icon={faEnvelopeOpen} />
                              <span>Marquer comme lu</span>
                            </li>

                            <li
                              onClick={() => onDelete(notification.id)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                cursor: "pointer",
                                padding: "8px",
                                color: "#dc3545", // rouge pour la corbeille
                              }}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                              <span>Supprimer cette notification</span>
                            </li>
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div
                style={{
                  padding: "12px 20px",
                  borderTop: "1px solid #dee2e6",
                  textAlign: "center",
                }}
              >
                <button
                  onClick={handleClearAll}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#dc3545",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Effacer toutes
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Overlay pour fermer en cliquant à l'extérieur */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1040,
            background: "transparent",
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

// Helpers
function getNotificationIcon(type) {
  switch (type) {
    case "ABSENCE_ADDED":
      return "⚠️";
    case "NOTE_ADDED":
      return "📝";
    case "PFE_UPDATE":
      return "📋";
    case "ASSIGNMENT_ADDED":
      return "📚";
    case "DEADLINE_REMINDER":
      return "⏰";
    default:
      return "🔔";
  }
}

function getNotificationColor(type) {
  switch (type) {
    case "ABSENCE_ADDED":
      return { background: "#fff3cd", color: "#856404" };
    case "NOTE_ADDED":
      return { background: "#d4edda", color: "#155724" };
    case "PFE_UPDATE":
      return { background: "#e3f2fd", color: "#0d47a1" };
    case "ASSIGNMENT_ADDED":
      return { background: "#f5e6ff", color: "#4a148c" };
    case "DEADLINE_REMINDER":
      return { background: "#fff0f0", color: "#c62828" };
    default:
      return { background: "#f8f9fa", color: "#495057" };
  }
}

function getNotificationTitle(type) {
  switch (type) {
    case "ABSENCE_ADDED":
      return "Nouvelle absence";
    case "NOTE_ADDED":
      return "Nouvelle note";
    case "PFE_UPDATE":
      return "Mise à jour PFE";
    case "ASSIGNMENT_ADDED":
      return "Devoir ajouté";
    case "DEADLINE_REMINDER":
      return "Rappel d'échéance";
    default:
      return "Notification";
  }
}

export default NotificationBell;
