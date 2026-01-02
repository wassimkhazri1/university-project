package com.university.manager.security.jwt;

import java.security.Principal;

//pour suivre les connexions
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.university.manager.services.PendingNotificationService;

@Component
public class WebSocketEventListener {

    @Autowired
    private PendingNotificationService pendingNotificationService;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        Principal user = headerAccessor.getUser();

        if (user != null) {
            String email = user.getName();
            System.out.println("🎉 Nouvelle connexion WebSocket: " + email);

            // Récupérer l’ID utilisateur via ton service
            Long userId = pendingNotificationService.findUserIdByEmail(email);

            if (userId != null) {
                pendingNotificationService.sendPendingNotifications(userId);
            } else {
                System.err.println("⚠️ Aucun ID trouvé pour l’email: " + email);
            }
        } else {
            System.out.println("⚠️ Connexion sans utilisateur attaché");
        }
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        Principal user = headerAccessor.getUser();

        if (user != null) {
            System.out.println("👋 Déconnexion WebSocket: " + user.getName());
        } else {
            System.out.println("⚠️ Déconnexion sans utilisateur attaché");
        }
    }
}
