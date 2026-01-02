package com.university.manager.controllers;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import com.university.manager.models.NotificationMessage;
import com.university.manager.services.PendingNotificationService;

@Controller
public class WebSocketController {

    @Autowired
    private PendingNotificationService pendingNotificationService;

    // Quand un utilisateur se connecte via WebSocket
    @MessageMapping("/connect")
    @SendTo("/topic/connections")
    public String handleConnect(SimpMessageHeaderAccessor headerAccessor) {
        String userId = headerAccessor.getUser().getName();
        System.out.println("Utilisateur connecté via WebSocket: " + userId);
        
        // Envoyer les notifications en attente
        if (userId != null) {
            try {
                Long id = Long.parseLong(userId);
                pendingNotificationService.sendPendingNotifications(id);
            } catch (NumberFormatException e) {
                System.err.println("ID utilisateur invalide: " + userId);
            }
        }
        
        return "User connected: " + userId;
    }

    // Marquer une notification comme lue
    @MessageMapping("/notification/read")
    public void handleNotificationRead(NotificationReadRequest request) {
        System.out.println("Notification marquée comme lue: " + request.getNotificationId());
        // Implémenter la logique de marquage comme lu ici
    }

    // Pour les tests
//    @MessageMapping("/notification/test")
//    @SendTo("/topic/global-notifications")
//    public NotificationMessage sendTestNotification() {
//        return NotificationMessage.builder()
//                .type("TEST")
//                .message("Ceci est une notification de test")
//                .timestamp(new Date())
//                .build();
//    }
}

// Classe pour la requête de lecture
class NotificationReadRequest {
    private String userId;
    private String notificationId;
    
    // Getters et setters
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getNotificationId() { return notificationId; }
    public void setNotificationId(String notificationId) { this.notificationId = notificationId; }
}
