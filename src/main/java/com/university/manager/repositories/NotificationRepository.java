package com.university.manager.repositories;

import com.university.manager.models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    
    // Trouver toutes les notifications d'un utilisateur triées par date (plus récentes d'abord)
    List<Notification> findByUserIdOrderByTimestampDesc(Long userId);
    
    // Trouver les notifications non lues d'un utilisateur
    List<Notification> findByUserIdAndReadFalse(Long userId);
    
    // Trouver une notification spécifique d'un utilisateur
    Optional<Notification> findByIdAndUserId(Long id, Long userId);
    
    // Supprimer toutes les notifications d'un utilisateur
    @Modifying
    @Query("DELETE FROM Notification n WHERE n.userId = :userId")
    void deleteByUserId(@Param("userId") Long userId);
    
    
    
    // Compter les notifications non lues
    @Query("DELETE FROM Notification n WHERE n.userId = :userId AND n.read = false")
    void deleteByUserIdAndNotificationRead(@Param("userId") Long userId);
    
    
    
    // Supprimer toutes les notifications "read == true" d'un utilisateur    
    void deleteByUserIdAndRead(Long userId, Boolean read);
    
    
    // Trouver les notifications par type
    List<Notification> findByUserIdAndType(Long userId, String type);
    
    // Compter les notifications non lues
    @Query("SELECT COUNT(n) FROM Notification n WHERE n.userId = :userId AND n.read = false")
    Long countUnreadByUserId(@Param("userId") Long userId);
    
    // Trouver les notifications récentes (des 7 derniers jours par exemple)
    @Query("SELECT n FROM Notification n WHERE n.userId = :userId AND n.timestamp >= :since ORDER BY n.timestamp DESC")
    List<Notification> findRecentByUserId(@Param("userId") Long userId, @Param("since") java.util.Date since);
}