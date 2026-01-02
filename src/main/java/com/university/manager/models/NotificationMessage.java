package com.university.manager.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;

public class NotificationMessage {
    private String type; // ABSENCE_ADDED, NOTE_ADDED, etc.
    private String message;
    private Long absenceId;
    private Long id;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private Date timestamp;
    private Boolean read = false;
    
    // Constructeurs
    public NotificationMessage() {}
    
    public NotificationMessage(String type, String message) {
        this.type = type;
        this.message = message;
        this.timestamp = new Date();
    }
    
    public NotificationMessage(String type, String message, Long absenceId) {
        this.type = type;
        this.message = message;
        this.absenceId = absenceId;
        this.timestamp = new Date();
    }
    
    // Getters et setters
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public Long getAbsenceId() { return absenceId; }
    public void setAbsenceId(Long absenceId) { this.absenceId = absenceId; }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Date getTimestamp() { return timestamp; }
    public void setTimestamp(Date timestamp) { this.timestamp = timestamp; }
    
    public Boolean getRead() { return read; }
    public void setRead(Boolean read) { this.read = read; }
    
    @Override
    public String toString() {
        return "NotificationMessage{" +
               "type='" + type + '\'' +
               ", message='" + message + '\'' +
               ", absenceId=" + absenceId +
               ", timestamp=" + timestamp +
               ", read=" + read +
               '}';
    }
}