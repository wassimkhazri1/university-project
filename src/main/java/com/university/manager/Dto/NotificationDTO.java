package com.university.manager.Dto;

import java.util.Date;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class NotificationDTO {
    private Long id;
    private String type;
    private String message;
    private Long absenceId;
    private Date timestamp;
    private Boolean read;
    private Long userId;
    private Map<String, Object> additionalData;
    
    // Constructeurs
    public NotificationDTO() {}
    
    public NotificationDTO(String type, String message, Long absenceId) {
        this.type = type;
        this.message = message;
        this.absenceId = absenceId;
        this.timestamp = new Date();
        this.read = false;
    }
    
    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public Long getAbsenceId() { return absenceId; }
    public void setAbsenceId(Long absenceId) { this.absenceId = absenceId; }
    
    public Date getTimestamp() { return timestamp; }
    public void setTimestamp(Date timestamp) { this.timestamp = timestamp; }
    
    public Boolean getRead() { return read; }
    public void setRead(Boolean read) { this.read = read; }
    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public Map<String, Object> getAdditionalData() { return additionalData; }
    public void setAdditionalData(Map<String, Object> additionalData) { this.additionalData = additionalData; }
}