package com.university.manager.models;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "niveaux_scolaires")
@Getter
@Setter
public class NiveauScol {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, unique = true)
	private String nom; // Ex: "1ère Année", "2ème Année"

//	@OneToMany(mappedBy = "niveauScolaire", cascade = CascadeType.ALL)
//	private List<Branche> branches;

	public NiveauScol() {
	}

	public NiveauScol(String nom) {
		this.nom = nom;
	}

}
