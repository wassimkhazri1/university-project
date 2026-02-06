// src/hooks/useWebSocketNotifications.js
import { useEffect, useRef, useCallback } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { toast } from "react-hot-toast";

const MAX_RECONNECT_ATTEMPTS = 5;
let globalReconnectAttempts = 0;

const useWebSocketNotifications = (userId, onNewNotification) => {
  const clientRef = useRef(null);
  const isConnectedRef = useRef(false);
  const reconnectTimeoutRef = useRef(null); // <-- AJOUTER CETTE LIGNE
  const reconnectAttemptsRef = useRef(0); // <-- AJOUTER CETTE LIGNE

  // Fonction pour créer et configurer le client STOMP
  const createStompClient = useCallback(() => {
    if (!userId) return null;

    const socket = new SockJS("http://localhost:8080/ws");

    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        // 'X-User-Id': userId.toString()
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => {
        // Filtrer les logs de heartbeat pour moins de bruit
        if (!str.includes("HEARTBEAT")) {
        }
      },
      onConnect: () => {
        isConnectedRef.current = true;
        reconnectAttemptsRef.current = 0; // Réinitialiser les tentatives

        // S'abonner aux notifications personnelles
        // const destination = `/user/${userId}/queue/notifications`;
        const destination = `/user/queue/notifications`;
        client.subscribe(destination, (message) => {
          try {
            const notification = JSON.parse(message.body);

            // Appeler le callback avec la nouvelle notification
            if (onNewNotification) {
              onNewNotification(notification);
            }

            // Afficher une notification toast
            showNotificationToast(notification);
          } catch (error) {
            console.error(
              "❌ Erreur lors du traitement de la notification:",
              error,
              message.body,
            );
          }
        });

        // S'abonner aux erreurs (optionnel)
        client.subscribe(`/user/${userId}/queue/errors`, (message) => {
          console.error("❌ Erreur WebSocket:", message.body);
        });

        // Notifier le serveur que l'utilisateur est connecté
        client.publish({
          destination: `/app/user/connected`,
          body: JSON.stringify({ userId, timestamp: new Date().toISOString() }),
        });
      },
      onStompError: (frame) => {
        console.error("❌ Erreur STOMP:", frame.headers["message"]);
        console.error("📋 Détails:", frame.body);

        // Réessayer de se connecter
        if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
          reconnectAttemptsRef.current++;
        }
      },
      onDisconnect: () => {
        isConnectedRef.current = false;
      },
      onWebSocketError: (error) => {
        console.error("🌐 Erreur WebSocket:", error);
      },
      onWebSocketClose: (event) => {
        isConnectedRef.current = false;

        // Tentative de reconnexion intelligente
        if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
          reconnectAttemptsRef.current++;
          const delay = Math.min(5000 * reconnectAttemptsRef.current, 30000); // Backoff exponentiel

          if (!reconnectTimeoutRef.current) {
            reconnectTimeoutRef.current = setTimeout(() => {
              connect();
              reconnectTimeoutRef.current = null;
            }, delay);
          }
        }
      },
    });

    return client;
  }, [userId, onNewNotification]);

  // Fonction pour afficher une notification toast
  const showNotificationToast = (notification) => {
    const toastOptions = {
      duration: 6000,
      position: "top-right",
      style: {
        background: "#fff",
        color: "#333",
        borderLeft: "4px solid #f59e0b",
        borderRadius: "8px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        padding: "16px",
      },
    };

    switch (notification.type) {
      case "ABSENCE_ADDED":
        toast.custom(
          (t) => (
            <div
              className={`notification-toast ${
                t.visible ? "animate-enter" : "animate-leave"
              }`}
            >
              <div className="notification-content">
                <div
                  className="notification-icon"
                  style={{ color: "#f59e0b", fontSize: "24px" }}
                >
                  ⚠️
                </div>
                <div className="notification-text">
                  <p style={{ fontWeight: "bold", marginBottom: "4px" }}>
                    Nouvelle absence
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#666",
                      marginBottom: "2px",
                    }}
                  >
                    {notification.message || "Une absence a été ajoutée"}
                  </p>
                  {notification.date && (
                    <p style={{ fontSize: "12px", color: "#999" }}>
                      Date:{" "}
                      {new Date(notification.date).toLocaleDateString("fr-FR")}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => toast.dismiss(t.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#999",
                    fontSize: "20px",
                    cursor: "pointer",
                    padding: "0",
                    marginLeft: "10px",
                  }}
                >
                  ×
                </button>
              </div>
            </div>
          ),
          toastOptions,
        );
        break;

      case "NOTE_ADDED":
        toast.success(
          `📝 ${notification.message || "Nouvelle note ajoutée"}`,
          toastOptions,
        );
        break;

      case "PFE_UPDATE":
        toast.custom(
          (t) => (
            <div
              style={{
                background: "#e3f2fd",
                borderLeft: "4px solid #2196f3",
                padding: "12px 16px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div>📋</div>
              <div>
                <strong>Mise à jour PFE</strong>
                <div style={{ fontSize: "14px" }}>{notification.message}</div>
              </div>
            </div>
          ),
          { ...toastOptions, duration: 8000 },
        );
        break;

      default:
        toast(notification.message || "Nouvelle notification", toastOptions);
    }
  };

  // Mettre à jour l'URL pour correspondre à votre nouveau endpoint
  const fetchPendingNotifications = useCallback(async () => {
    if (!userId) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/notifications/pending`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        const pendingNotifications = await response.json();
        pendingNotifications.forEach((notification) => {
          if (onNewNotification) {
            onNewNotification(notification);
          }
          showNotificationToast(notification);
        });
      } else if (response.status === 401) {
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des notifications en attente:",
        error,
      );
    }
  }, [userId, onNewNotification]);

  // Fonction pour connecter le WebSocket
  const connect = useCallback(() => {
    if (!userId) {
      return;
    }

    if (isConnectedRef.current) {
      return;
    }

    // Nettoyer l'ancien client s'il existe
    if (clientRef.current) {
      disconnect();
    }

    // Créer un nouveau client
    const client = createStompClient();
    if (!client) {
      console.error("Impossible de créer le client STOMP");
      return;
    }

    clientRef.current = client;

    try {
      client.activate();
    } catch (error) {
      console.error("Erreur lors de l'activation du client STOMP:", error);
    }
  }, [userId, createStompClient]);

  // Fonction pour déconnecter le WebSocket
  const disconnect = useCallback(() => {
    // Nettoyer le timeout de reconnexion
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    // Réinitialiser le compteur de tentatives
    reconnectAttemptsRef.current = 0;

    if (clientRef.current) {
      try {
        clientRef.current.deactivate();
      } catch (error) {
        console.error("Erreur lors de la déconnexion:", error);
      }
      clientRef.current = null;
    }

    isConnectedRef.current = false;
  }, []);

  const deleteNotification = useCallback(
    async (notificationId) => {
      if (!userId || !clientRef.current || !isConnectedRef.current) {
      } else {
        try {
          const token = localStorage.getItem("token");

          const resClear = await fetch(
            `http://localhost:8080/api/notifications/notification/clear/${notificationId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            },
          );

          if (!resClear.ok) {
            throw new Error("Erreur lors de la suppression");
          }
        } catch (error) {
          console.error(error);
        }
        return;
      }
    },
    [userId],
  );
  // Fonction pour envoyer une notification (ex: marquer comme lu)
  const sendNotificationRead = useCallback(
    async (notificationId) => {
      if (!userId || !clientRef.current || !isConnectedRef.current) {
      } else {
        try {
          const token = localStorage.getItem("token");

          const resRead = await fetch(
            `http://localhost:8080/api/notifications/${notificationId}/read`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            },
          );

          if (!resRead.ok) {
            throw new Error("Erreur lors du marquage comme lu");
          }
        } catch (error) {
          console.error(error);
        }
        return;
      }
      // Envoi via WebSocket
      clientRef.current.publish({
        destination: `/app/notification/read`,
        body: JSON.stringify({
          userId,
          notificationId,
          timestamp: new Date().toISOString(),
        }),
      });
    },
    [userId],
  );

  // Fonction pour effacer toutes les notifications
  const clearNotification = useCallback(async (userId) => {
    if (userId) {
      try {
        const token = localStorage.getItem("token");
        await fetch(`http://localhost:8080/api/notifications/clear/${userId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.error("Erreur lors du suppression", error);
      }
      return;
    }
  });

  // Fonction pour envoyer une notification de test
  const sendTestNotification = useCallback(() => {
    if (!clientRef.current || !isConnectedRef.current) {
      return;
    }

    const testNotification = {
      type: "TEST",
      message: "Ceci est une notification de test",
      timestamp: new Date().toISOString(),
    };

    clientRef.current.publish({
      destination: `/app/notification/test`,
      body: JSON.stringify(testNotification),
    });
  }, []);

  // Effet pour gérer la connexion/déconnexion
  useEffect(() => {
    if (userId) {
      connect();
    } else {
      disconnect();
    }

    // Nettoyage à la déconnexion
    return () => {
      disconnect();
    };
  }, [userId, connect, disconnect]);

  // Effet pour gérer les changements de visibilité de la page
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "visible" &&
        userId &&
        !isConnectedRef.current
      ) {
        connect();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [userId, connect]);

  // Ajouter un effet pour nettoyer à la fin
  useEffect(() => {
    return () => {
      // S'assurer que tout est nettoyé
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  return {
    connect,
    disconnect,
    sendNotificationRead,
    sendTestNotification,
    deleteNotification,
    clearNotification,
    isConnected: isConnectedRef.current,
  };
};

export default useWebSocketNotifications;
