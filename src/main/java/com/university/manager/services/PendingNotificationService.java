package com.university.manager.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.university.manager.models.NotificationMessage;
import com.university.manager.models.Personne;
import com.university.manager.repositories.PersonneRepository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class PendingNotificationService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    
    @Autowired
    private PersonneRepository personneRepository;
    
    // Stocker les notifications en attente par userId
    private final Map<Long, List<NotificationMessage>> pendingNotifications = 
        new ConcurrentHashMap<>();

    public void addPendingNotification(Long userId, NotificationMessage notification) {
        pendingNotifications.computeIfAbsent(userId, k -> new ArrayList<>())
                          .add(notification);
        System.out.println("Notification en attente ajoutée pour userId: " + userId);
    }

    public List<NotificationMessage> getPendingNotifications(Long userId) {
        return pendingNotifications.getOrDefault(userId, new ArrayList<>());
    }

    public List<NotificationMessage> getAndClearPendingNotifications(Long userId) {
        return pendingNotifications.remove(userId);
    }

    public void sendPendingNotifications(Long userId) {
        List<NotificationMessage> pending = getAndClearPendingNotifications(userId);
        Optional<Personne> findPersonne = personneRepository.findById(userId);
        if (pending != null && !pending.isEmpty()) {
            System.out.println("Envoi des notifications en attente pour userId: " + userId);
            pending.forEach(notification -> {
                try {
                    messagingTemplate.convertAndSendToUser(
                        //userId.toString(),
                    	findPersonne.get().getEmail(),	
                        "/queue/notifications",
                        notification
                    );
                    System.out.println("Notification en attente envoyée: " + notification.getMessage());
                    System.out.println("=============================");
                    System.out.println("Notification envoyée à email: " + findPersonne.get().getEmail());
                } catch (Exception e) {
                    System.err.println("Erreur lors de l'envoi de notification en attente: " + e.getMessage());
                }
            });
        }
    }

    public void clearPendingNotifications(Long userId) {
        pendingNotifications.remove(userId);
    }

    public boolean hasPendingNotifications(Long userId) {
        List<NotificationMessage> notifications = pendingNotifications.get(userId);
        return notifications != null && !notifications.isEmpty();
    }

	public Long findUserIdByEmail(String email) {
		// TODO Auto-generated method stub
		Optional<Personne> personne = personneRepository.findByEmail(email);
		return personne.get().getId();
	}
}
