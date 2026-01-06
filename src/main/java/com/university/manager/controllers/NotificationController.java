package com.university.manager.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import com.university.manager.services.NotificationService;
import com.university.manager.services.PendingNotificationService;
import com.university.manager.Dto.NotificationDTO;
import com.university.manager.models.Notification;
import com.university.manager.models.NotificationMessage;
import com.university.manager.models.Personne;
import com.university.manager.repositories.NotificationRepository;
import com.university.manager.repositories.PersonneRepository;

import java.security.Principal;
import java.util.Date;
import java.util.Map;
import java.util.Optional;
import java.util.HashMap;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

	@Autowired
	private SimpMessagingTemplate messagingTemplate;

	@Autowired
	private NotificationService notificationService;

	@Autowired
	private PersonneRepository personneRepository;

	@Autowired
	private PendingNotificationService pendingNotificationService;

	@Autowired
	private NotificationRepository notificationRepository;

	@MessageMapping("/notifications/check-pending")
	public void checkPendingNotifications(@Payload Map<String, Object> payload, Principal principal) {
		try {
			if (principal != null && principal.getName() != null) {
				Long userId = Long.parseLong(principal.getName());
				System.out.println("Vérification des notifications en attente pour userId: " + userId);
				pendingNotificationService.sendPendingNotifications(userId);
			}
		} catch (Exception e) {
			System.err.println("Erreur lors de la vérification des notifications en attente:");
			e.printStackTrace();
		}
	}

    // Méthode pour envoyer une notification (à utiliser depuis d'autres services)
	public void sendNotification(Long userId, String type, String message, Long absenceId) {

		notificationService.sendNotification(userId, type, message, absenceId);

	}
	
	@DeleteMapping("/clear/{userId}")
	public void clearAllNotifications(@PathVariable Long userId) {
		notificationService.clearAllNotifications(userId);
	}
	
	@DeleteMapping("/notification/clear/{notificationId}")
	public void deleteNotifications(@PathVariable Long notificationId) {
		notificationService.deleteNotification(notificationId);
	}

	// Endpoint REST pour récupérer les notifications en attente
	@GetMapping("/pending")
	public ResponseEntity<Map<String, Object>> getPendingNotifications(Principal principal) {
		try {
			if (principal == null) {
				return ResponseEntity.status(401).build();
			}

			Long userId = Long.parseLong(principal.getName());
			List<NotificationMessage> notifications = pendingNotificationService.getPendingNotifications(userId);
			boolean hasPending = pendingNotificationService.hasPendingNotifications(userId);

			Map<String, Object> response = new HashMap<>();
			response.put("notifications", notifications);
			response.put("count", notifications.size());
			response.put("hasPending", hasPending);
			response.put("userId", userId);

			return ResponseEntity.ok(response);
		} catch (Exception e) {
			System.err.println("Erreur lors de la récupération des notifications en attente:");
			e.printStackTrace();
			return ResponseEntity.status(500).build();
		}
	}

	// Endpoint pour effacer les notifications en attente
	@DeleteMapping("/pending/clear")
	public ResponseEntity<Map<String, Object>> clearPendingNotifications(Principal principal) {
		try {
			if (principal == null) {
				return ResponseEntity.status(401).build();
			}

			Long userId = Long.parseLong(principal.getName());
			pendingNotificationService.clearPendingNotifications(userId);

			Map<String, Object> response = new HashMap<>();
			response.put("message", "Notifications en attente effacées");
			response.put("userId", userId);
			response.put("timestamp", new Date());

			return ResponseEntity.ok(response);
		} catch (Exception e) {
			System.err.println("Erreur lors de l'effacement des notifications en attente:");
			e.printStackTrace();
			return ResponseEntity.status(500).build();
		}
	}

	@GetMapping("/user/{userId}")
	public List<NotificationDTO> getUserNotifications(@PathVariable Long userId) {
		return notificationService.getUserNotifications(userId);
	}

	@PutMapping("/{id}/read")
	public ResponseEntity<Void> markAsRead(@PathVariable Long id) {
		notificationService.markAsRead(id);
		return ResponseEntity.ok().build();
	}

	@PutMapping("/user/{userId}/readAll")
	public ResponseEntity<Void> markAllAsRead(@PathVariable Long userId) {
		notificationService.markAllAsRead(userId);
		return ResponseEntity.ok().build();
	}
}