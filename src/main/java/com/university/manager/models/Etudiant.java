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
public class Etudiant extends Personne {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String matricule;

	@ManyToOne
	@JoinColumn(name = "groupe_id", nullable = false)
	private Groupe groupe;

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
	
//    @OneToMany(mappedBy = "etudiant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<Absence> absences;

	@ManyToMany(mappedBy = "etudiants")
	private List<Matiere> matieres = new ArrayList<>();

	// Combinaison des logiques de génération de mot de passe et de matricule
	@PrePersist
	@PreUpdate
	public void generateMatriculeAndPassword() {
		String TRI = "-";
		if (niveauScol != null && classe != null && groupe != null && this.getCinNumber() != null) {
			this.matricule = typeNiveauScol(niveauScol) + TRI + typeClasse(classe) + TRI + typeGroupe(groupe) + TRI
					+ this.getCinNumber();
		}
//		if (matricule != null && this.getPrenom() != null) {
//			this.password = matricule + this.getPrenom();
//		}
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
	public String typeGroupe(Groupe groupe) {
		switch (groupe.getName()) {
		case GROUPE_1:
			return "G1";
		case GROUPE_2:
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

	public Etudiant(Long id, String matricule, Groupe groupe, Classe classe, NiveauScol niveauScol, Branche branche,
			List<Note> notes, List<Matiere> matieres) {
		super();
		this.id = id;
		this.matricule = matricule;
		this.groupe = groupe;
		this.classe = classe;
		this.niveauScol = niveauScol;
		this.branche = branche;
		this.notes = notes;
		this.matieres = matieres;
	}

	public Etudiant(String nom, String prenom, String email, @NotBlank @Size(max = 10) String cinNumber,
			@NotBlank @Size(max = 8) String telephone, String password) {
		super(nom, prenom, email, cinNumber, telephone, password);

	}

}
