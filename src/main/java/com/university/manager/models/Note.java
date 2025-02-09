package com.university.manager.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
@Entity
@Table(name = "notes")
@Getter
@Setter
public class Note {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@DecimalMin(value = "0.0", inclusive = false, message = "Value must be greater than 0")
	private Double noteTd;

	@NotNull
	@DecimalMin(value = "0.0", inclusive = false, message = "Value must be greater than 0")
	private Double coefTd;

	@NotNull
	@DecimalMin(value = "0.0", inclusive = false, message = "Value must be greater than 0")
	private Double noteExamen;

	@NotNull
	@DecimalMin(value = "0.0", inclusive = false, message = "Value must be greater than 0")
	private Double coefExamen;

	private Double moyenne;

	private Double credits;

	private Double noteNormale;

	private Double noteRattrapage;

	private Double creditsNormale;

	private Double creditsRattrapage;

	@NotNull
	@DecimalMin(value = "0.0", inclusive = false, message = "Value must be greater than 0")
	private Double coefMoyenne;

	@ManyToOne
	@JoinColumn(name = "etudiant_id")
	private Etudiant etudiant;

	@ManyToOne
	@JoinColumn(name = "matiere_id")
	private Matiere matiere;

	// Méthode pour calculer la moyenne
	@PrePersist
	@PreUpdate
	public void calculateMoyenne() {
		if (coefExamen != null && coefTd != null && noteExamen != null && noteTd != null) {
			this.moyenne = (coefExamen * noteExamen + coefTd * noteTd) / (coefExamen + coefTd);
			calculateCredits();
		}
	}

	// Méthode pour calculer le Credit
	public void calculateCredits() {
	    if (moyenne == null) {
	        this.credits = 0.0;
	        return;
	    }

	    if (moyenne < 10) {
	        this.credits = 0.0;
	    } else if (moyenne < 15) { // Pas besoin de "moyenne >= 10 && moyenne < 15"
	        this.credits = 2.0;
	    } else if (moyenne < 17) { // Pas besoin de "this.moyenne >= 15"
	        this.credits = 3.0;
	    } else {
	        this.credits = 4.0;
	    }
	}
	public Note() {
		super();
		// TODO Auto-generated constructor stub
	}

}
