package com.university.manager.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.university.manager.Dto.NotificationDTO;
import com.university.manager.models.Absence;
import com.university.manager.models.Etudiant;
import com.university.manager.models.Matiere;
import com.university.manager.models.Notification;
import com.university.manager.models.Personne;
import com.university.manager.repositories.EtudiantRepository;
import com.university.manager.repositories.NotificationRepository;
import com.university.manager.repositories.PersonneRepository;

import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NotificationService {

	@Autowired
	private SimpMessagingTemplate messagingTemplate;

	@Autowired
	private NotificationRepository notificationRepository;

	@Autowired
	private EtudiantRepository etudiantRepository;

	@Autowired
	private PersonneRepository personneRepository;

	// Formatter pour LocalDate
	private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

	public List<NotificationDTO> getUserNotifications(Long userId) {
		return notificationRepository.findByUserIdOrderByTimestampDesc(userId).stream().map(this::convertToDTO)
				.collect(Collectors.toList());
	}

	@Transactional
	public void markAsRead(Long notificationId) {
		notificationRepository.findById(notificationId).ifPresent(notification -> {
			notification.setRead(true);
			notificationRepository.save(notification);
		});
	}

	@Transactional
	public void markAllAsRead(Long userId) {
		List<Notification> unreadNotifications = notificationRepository.findByUserIdAndReadFalse(userId);
		unreadNotifications.forEach(notification -> notification.setRead(true));
		notificationRepository.saveAll(unreadNotifications);
	}

	@Transactional
	public void deleteNotification(Long notificationId) {
		notificationRepository.findById(notificationId).ifPresent(notification -> {
			notificationRepository.deleteById(notificationId);
		});

	}

	@Transactional
	public void clearAllNotifications(Long userId) {
		notificationRepository.deleteByUserId(userId);
		// notificationRepository.deleteByUserIdAndNotificationRead(userId);
		// notificationRepository.deleteByUserIdAndRead(userId, false);
	}

	public boolean isNotificationBelongsToUser(Long notificationId, Long userId) {
		return notificationRepository.findByIdAndUserId(notificationId, userId).isPresent();
	}

	public Notification saveNotification(NotificationDTO notificationDTO) {
		Notification notification = new Notification();
		notification.setType(notificationDTO.getType());
		notification.setMessage(notificationDTO.getMessage());
		notification.setAbsenceId(notificationDTO.getAbsenceId());
		notification.setTimestamp(notificationDTO.getTimestamp() != null ? notificationDTO.getTimestamp() : new Date());
		notification.setRead(notificationDTO.getRead() != null ? notificationDTO.getRead() : false);
		notification.setUserId(notificationDTO.getUserId());
		notification.setAdditionalData(notificationDTO.getAdditionalData());

		return notificationRepository.save(notification);
	}

	public void sendNotification(Long userId, String type, String message, Long absenceId) {
		Optional<Personne> findPersonne = personneRepository.findById(userId);
		if (findPersonne.isEmpty()) {
			System.err.println("❌ Aucun utilisateur trouvé avec ID: " + userId);
			return;
		}

		String email = findPersonne.get().getEmail();

		// Construire le DTO
		NotificationDTO dto = new NotificationDTO();
		dto.setUserId(userId);
		dto.setType(type);
		dto.setMessage(message);
		dto.setAbsenceId(absenceId);
		dto.setTimestamp(new Date());
		dto.setRead(false);

		Notification notification = new Notification();
		notification.setType(dto.getType());
		notification.setMessage(dto.getMessage());
		notification.setAbsenceId(dto.getAbsenceId());
		notification.setTimestamp(dto.getTimestamp() != null ? dto.getTimestamp() : new Date());
		notification.setRead(dto.getRead() != null ? dto.getRead() : false);
		notification.setUserId(dto.getUserId());
		notification.setAdditionalData(dto.getAdditionalData());

		messagingTemplate.convertAndSendToUser(email, "/queue/notifications", convertToDTO(notification));
		notificationRepository.save(notification);

	}

	private NotificationDTO convertToDTO(Notification notification) {
		NotificationDTO dto = new NotificationDTO();
		dto.setId(notification.getId());
		dto.setType(notification.getType());
		dto.setMessage(notification.getMessage());
		dto.setAbsenceId(notification.getAbsenceId());
		dto.setTimestamp(notification.getTimestamp());
		dto.setRead(notification.isRead());
		dto.setUserId(notification.getUserId());
		dto.setAdditionalData(notification.getAdditionalData());
		return dto;
	}

	// Méthode utilitaire pour formater LocalDate
	private String formatLocalDate(java.time.LocalDate date) {
		if (date == null) {
			return "date inconnue";
		}
		return date.format(DATE_FORMATTER);
	}

	// Méthode utilitaire pour formater Date
	private String formatDate(Date date) {
		if (date == null) {
			return "date inconnue";
		}
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		return sdf.format(date);
	}

	private String getStatusText(boolean justified) {
		return justified ? "Justifiée" : "Non justifiée";
	}

	private String getStatusText(String status) {
		if (status == null) {
			return "Inconnu";
		}
		switch (status.toUpperCase()) {
		case "PENDING":
			return "En attente";
		case "JUSTIFIED":
			return "Justifiée";
		case "UNJUSTIFIED":
			return "Non justifiée";
		case "EXCUSED":
			return "Excusée";
		default:
			return status;
		}
	}

	/**
	 * Envoyer une notification lorsqu'une absence est créée
	 */
	@Transactional
	public void sendAbsenceNotification(Absence absence) {
		try {

			// Vérifier que l'absence a un étudiant
			if (absence.getEtudiant() == null) {
				System.err.println("❌ ERREUR: Absence sans étudiant associé!");
				return;
			}

			Etudiant etudiant = absence.getEtudiant();
			Optional<Etudiant> etudiant1 = etudiantRepository.findById(etudiant.getId());

			// Vérifier que l'étudiant a un ID
			if (etudiant.getId() == null) {
				System.err.println("❌ ERREUR: Étudiant sans ID!");
				return;
			}

			// Préparer le message
			String dateStr = formatLocalDate(absence.getDate());
			String matiereStr = (absence.getMatiere() != null) ? absence.getMatiere().getNom() : "cours inconnu";
			String reasonStr = (absence.getReason() != null && !absence.getReason().trim().isEmpty())
					? "Motif: " + absence.getReason()
					: "";

			// Message pour l'étudiant
			StringBuilder messageBuilder = new StringBuilder();
			messageBuilder.append("Absence enregistrée le ").append(dateStr);
			messageBuilder.append(" pour ").append(matiereStr);

			if (!reasonStr.isEmpty()) {
				messageBuilder.append(" - ").append(reasonStr);
			}

			if (absence.isJustified()) {
				messageBuilder.append(" (Justifiée)");
			} else {
				messageBuilder.append(" (À justifier)");
			}

			String studentMessage = messageBuilder.toString();

			// Envoyer la notification via le contrôleur
			sendNotification(etudiant.getId(), "ABSENCE_ADDED", studentMessage, absence.getId());

		} catch (Exception e) {
			System.err.println("\n❌ ERREUR CRITIQUE dans sendAbsenceNotification:");
			e.printStackTrace();

		}
	}

	/**
	 * Envoyer une notification de rappel d'absence
	 */
	@Transactional
	public void sendAbsenceReminderNotification(Absence absence) {
		try {

			if (absence.getEtudiant() == null) {
				System.err.println("❌ Absence sans étudiant pour rappel!");
				return;
			}

			String message = String.format(
					"Rappel: Vous avez été absent(e) le %s pour %s. Merci de fournir un justificatif si nécessaire.",
					formatLocalDate(absence.getDate()),
					(absence.getMatiere() != null) ? absence.getMatiere().getNom() : "cours");

			sendNotification(absence.getEtudiant().getId(), "ABSENCE_REMINDER", message, absence.getId());

		} catch (Exception e) {
			System.err.println("❌ Erreur lors de l'envoi de la notification de rappel:");
			e.printStackTrace();
		}
	}

	/**
	 * Envoyer une notification de justification d'absence
	 */
	@Transactional
	public void sendAbsenceJustifiedNotification(Absence absence, boolean isNowJustified) {
		try {

			if (absence.getEtudiant() == null) {
				return;
			}

			String status = isNowJustified ? "justifiée" : "non justifiée";
			String message = String.format("Votre absence du %s pour %s a été marquée comme %s.",
					formatLocalDate(absence.getDate()),
					(absence.getMatiere() != null) ? absence.getMatiere().getNom() : "cours", status);

			sendNotification(absence.getEtudiant().getId(), "ABSENCE_JUSTIFICATION_UPDATED", message, absence.getId());

		} catch (Exception e) {
			System.err.println("❌ Erreur lors de l'envoi de la notification de justification:");
			e.printStackTrace();
		}
	}

	/**
	 * Sauvegarder et envoyer une notification
	 */
	@Transactional
	public void saveAndSendNotification(NotificationDTO notificationDTO) {
		try {

			// Sauvegarder dans la base de données
			Notification notification = saveNotification(notificationDTO);

			// Envoyer via WebSocket si l'utilisateur est connecté
			if (notificationDTO.getUserId() != null) {
				sendNotification(notificationDTO.getUserId(), notificationDTO.getType(), notificationDTO.getMessage(),
						notificationDTO.getAbsenceId());
				System.out.println("Notification envoyée via WebSocket");
			}

			System.out.println("=== FIN saveAndSendNotification ===\n");

		} catch (Exception e) {
			System.err.println("❌ Erreur lors de la sauvegarde et envoi de notification:");
			e.printStackTrace();
		}
	}

}