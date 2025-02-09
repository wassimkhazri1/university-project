package com.university.manager.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "personnes")
@Getter
@Setter
public class Personne {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String nom;

	@Column(nullable = false)
	private String prenom;

	@Column(unique = true, nullable = false)
	private String email;

	@NotBlank
	@Size(max = 10)
	private String cinNumber;

	@NotBlank
	@Size(max = 8)
	private String telephone;

	public Personne() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Personne(String nom, String prenom, String email, @NotBlank @Size(max = 10) String cinNumber,
			@NotBlank @Size(max = 8) String telephone) {
		super();
		this.nom = nom;
		this.prenom = prenom;
		this.email = email;
		this.cinNumber = cinNumber;
		this.telephone = telephone;
	}
	
	

}
