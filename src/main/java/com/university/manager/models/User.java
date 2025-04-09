package com.university.manager.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 20)
	private String firstName;

	@NotBlank
	@Size(max = 20)
	private String lastName;

	@NotBlank
	@Size(max = 50)
	@Email
	private String email;

	@NotBlank
	@Size(max = 10)
	private String cinNumber;

	private String matricule;

	private String password;

	private String niveauScolaire;

	// private String groupe;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "groupe_id")
	private Groupe groupe;

	@Lob
	@Column(name = "photo", columnDefinition = "LONGTEXT")
	private String photo;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "role_id")
	private Role role;

	// Combinaison des logiques de génération de mot de passe et de matricule
	@PrePersist
	@PreUpdate
	public void generateMatriculeAndPassword() {
		if (role != null && niveauScolaire != null && groupe != null && cinNumber != null) {
			this.matricule = typeRole(role) + niveauScolaire + typeGroup(groupe) + cinNumber;
		}
		if (matricule != null && firstName != null) {
			this.password = matricule + firstName;
		}
	}

	// Méthode pour déterminer le type de rôle
	public String typeRole(Role role) {
		switch (role.getName()) {
		case ROLE_STUDENT:
			return "S";
		case ROLE_PROF:
			return "P";
		case ROLE_ADMIN:
			return "A";
		default:
			return "";
		}
	}

	// Méthode pour déterminer le type de groupe
	public String typeGroup(Groupe group) {
		switch (group.getName()) {
		case GROUPE_1:
			return "G1";
		case GROUPE_2:
			return "G2";
		default:
			return "";
		}
	}
}
