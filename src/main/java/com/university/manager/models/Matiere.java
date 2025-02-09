package com.university.manager.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
@Entity
@Table(name = "matieres")
@Getter
@Setter
public class Matiere {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String nom;

	private String codeIntitule;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "nature_id")
	private Nature nature;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "semestre_id")
	private Semestre semestre;

	private String code;

	private String codeNat;

	// Méthode pour determiner le code nature
	@PrePersist
	@PreUpdate
	public void determinerCodeNat() {
		String natu = nature.getNom();
		if (natu != null) {
			switch (natu) {
			case "FONDAMENTALE":
				this.codeNat = "U.E.F";
				determinerCode();
				break;
			case "DECOUVERTE":
				this.codeNat = "U.E.D";
				determinerCode();
				break;
			case "TRANSVERSALE":
				this.codeNat = "U.E.T";
				determinerCode();
				break;
			default:
				this.codeNat = "";
				determinerCode();
				break;
			}
		}
	}

	// Méthode pour determiner le code
	public void determinerCode() {
		String natu = semestre.getNom();
		if (natu != null) {
			switch (natu) {
			case "SEMESTRE1":
				this.code = "UE1";
				break;
			case "SEMESTRE2":
				this.code = "UE2";
				break;
			default:
				this.code = "";
				break;
			}
		}
	}

	@ManyToOne
	@JoinColumn(name = "niveau_id", nullable = false)
	private NiveauScol niveauScol;

	@ManyToMany
	@JoinTable(name = "professeur_matiere", joinColumns = @JoinColumn(name = "matiere_id"), inverseJoinColumns = @JoinColumn(name = "professeur_id"))
	private List<Professeur> professeurs = new ArrayList<>();

	@ManyToMany
	@JoinTable(name = "etudiant_matiere", joinColumns = @JoinColumn(name = "matiere_id"), inverseJoinColumns = @JoinColumn(name = "etudiant_id"))
	private List<Etudiant> etudiants = new ArrayList<>();

	public Matiere() {
		super();
		// TODO Auto-generated constructor stub
	}

}
