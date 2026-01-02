package com.university.manager.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Notification {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "user_id", nullable = false)
	private Long userId;

	@Column(name = "type", nullable = false)
	private String type;

	@Column(name = "message", length = 500)
	private String message;

	@Column(name = "absence_id")
	private Long absenceId;

	@Column(name = "timestamp")
	@Temporal(TemporalType.TIMESTAMP)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
	private Date timestamp;

	@Column(name = "is_read")
	private boolean read = false;

	@Column(name = "additional_data", columnDefinition = "TEXT")
	private String additionalDataJson;

	@Transient // Ne sera pas persisté dans la base de données
	private Map<String, Object> additionalData;

	private static final ObjectMapper objectMapper = new ObjectMapper();

	// Getters et setters pour additionalData (avec conversion JSON)
	public Map<String, Object> getAdditionalData() {
		if (additionalData == null && additionalDataJson != null) {
			try {
				additionalData = objectMapper.readValue(additionalDataJson, Map.class);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return additionalData;
	}

	public void setAdditionalData(Map<String, Object> additionalData) {
		this.additionalData = additionalData;
		if (additionalData != null) {
			try {
				this.additionalDataJson = objectMapper.writeValueAsString(additionalData);
			} catch (JsonProcessingException e) {
				e.printStackTrace();
				this.additionalDataJson = null;
			}
		} else {
			this.additionalDataJson = null;
		}
	}

	// Méthode pour accéder directement au JSON
	public String getAdditionalDataJson() {
		return additionalDataJson;
	}

	public void setAdditionalDataJson(String additionalDataJson) {
		this.additionalDataJson = additionalDataJson;
		this.additionalData = null; // Réinitialiser le cache
	}

}