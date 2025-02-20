package com.university.manager.models;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "absences")
@Getter
@Setter
public class Absence {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private int count;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "etudiant_id")
	private Etudiant etudiant;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "matiere_id")
	private Matiere matiere;

	public Absence() {
		super();
	}

}
