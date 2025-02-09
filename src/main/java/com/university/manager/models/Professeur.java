package com.university.manager.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "professeurs")
@Getter
@Setter
public class Professeur {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne
	@JoinColumn(name = "personne_id")
	private Personne personne;

	@ManyToMany(mappedBy = "professeurs")
	private List<Classe> classes = new ArrayList<>();

	@ManyToMany(mappedBy = "professeurs")
	private List<Matiere> matieres = new ArrayList<>();

}
