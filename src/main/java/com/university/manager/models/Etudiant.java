package com.university.manager.models;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import java.util.ArrayList;
import java.util.List;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "etudiants")
@Getter
@Setter
public class Etudiant {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne
	@JoinColumn(name = "personne_id")
	private Personne personne;

	private String matricule;

	private String password;

	@ManyToOne
	@JoinColumn(name = "groupe_id", nullable = false)
	private Group groupe;

	@ManyToOne
	@JoinColumn(name = "classe_id", nullable = false)
	private Classe classe;

	@ManyToOne
	@JoinColumn(name = "niveau_id", nullable = false)
	private NiveauScol niveauScol;

	@ManyToOne
	@JoinColumn(name = "branche_id", nullable = false)
	private Branche branche;

	@OneToMany(mappedBy = "etudiant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Note> notes;
	
	@ManyToMany(mappedBy = "etudiants")
	private List<Matiere> matieres = new ArrayList<>();

	// Combinaison des logiques de génération de mot de passe et de matricule
	@PrePersist
	@PreUpdate
	public void generateMatriculeAndPassword() {
		String TRI = "-";
		if (niveauScol != null && classe != null && groupe != null && personne.getCinNumber() != null) {
			this.matricule = typeNiveauScol(niveauScol) + TRI + typeClasse(classe) + TRI + typeGroupe(groupe) + TRI
					+ personne.getCinNumber();
		}
		if (matricule != null && personne.getPrenom() != null) {
			this.password = matricule + personne.getPrenom();
		}
	}

	// Méthode pour déterminer le type d'année
	public String typeNiveauScol(NiveauScol niveauScol) {
		switch (niveauScol.getNom()) {
		case "PREMIERE_ANNEE":
			return "1A";
		case "DEUXIEME_ANNEE":
			return "2A";
		case "TROISIEME_ANNE":
			return "3A";

		default:
			return "";
		}
	}

	// Méthode pour déterminer le type de groupe
	public String typeGroupe(Group groupe) {
		switch (groupe.getNom()) {
		case "GROUPE_1":
			return "G1";
		case "GROUPE_2":
			return "G2";
		default:
			return "";
		}
	}

	// Méthode pour déterminer le type de Classe
	public String typeClasse(Classe classe) {
		switch (classe.getNom()) {
		case "CLASSE_A":
			return "CA";
		case "CLASSE_B":
			return "CB";
		case "CLASSE_C":
			return "CC";
		case "CLASSE_D":
			return "CD";
		case "CLASSE_E":
			return "CE";
		case "CLASSE_F":
			return "CF";
		case "CLASSE_G":
			return "CG";
		case "CLASSE_H":
			return "CH";
		case "CLASSE_I":
			return "CI";
		case "CLASSE_J":
			return "CJ";
		default:
			return "";
		}
	}

	public Etudiant() {
	}

	public Etudiant(Personne personne, Group groupe) {
		this.personne = personne;
		this.groupe = groupe;
	}

}
