package com.university.manager.models;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tickers")
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class NewsTicker {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "message", columnDefinition = "TEXT")
	private String message;

	@Column(name = "personne_id")
	private Long personneId;

}
