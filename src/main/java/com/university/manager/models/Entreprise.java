package com.university.manager.models;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "entreprises")
@Getter
@Setter
@NoArgsConstructor // Important : constructeur sans arguments
@AllArgsConstructor // Optionnel : constructeur avec tous les arguments
public class Entreprise extends Personne {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String matricule; // matricule fiscale
	private String nomcompany;
	private String owner;
	private String adresse;
	private String fax;
	private String web;
	private String linkedin;

	
	@OneToMany(mappedBy = "entreprise", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<JobOfferForm> joboffers = new ArrayList<>();
	
	// Constructeur avec paramètres (optionnel)
	public Entreprise(String matricule, String email, String nomcompany, String owner, String adresse, String fax,
			String web, String linkedin, String password) {
		this.matricule = matricule;
		this.nomcompany = nomcompany;
		this.owner = owner;
		this.adresse = adresse;
		this.fax = fax;
		this.web = web;
		this.linkedin = linkedin;

	}

	public Entreprise(String nom, String prenom, String email, @NotBlank @Size(max = 10) String cinNumber,
			@NotBlank @Size(max = 8) String telephone, String password) {
		super(nom, prenom, email, cinNumber, telephone, password);
		// TODO Auto-generated constructor stub
	}

	// Getters et Setters sont générés par Lombok (@Getter, @Setter)
}