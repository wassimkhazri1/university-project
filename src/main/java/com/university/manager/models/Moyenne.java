package com.university.manager.models;

import java.util.List;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
@Entity
@Table(name = "moyennes")
@Getter
@Setter
public class Moyenne {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Double moy;

	@OneToOne
	@JoinColumn(name = "etudiant_id")
	private Etudiant etudiant;

	@OneToMany(mappedBy = "moyenne", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Note> notes;

}
