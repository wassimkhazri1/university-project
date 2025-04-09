package com.university.manager.models;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import java.util.HashSet;
import java.util.Set;
import jakarta.persistence.*;

@Entity
@Table(name = "personnes")
@Getter
@Setter
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Personne {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String nom;

	@Column(nullable = false)
	private String prenom;

	@Column(unique = true, nullable = false)
	private String email;

	@NotBlank
	@Size(max = 10)
	private String cinNumber;

	@NotBlank
	@Size(max = 8)
	private String telephone;

	private String password;

	// Combinaison des logiques de génération de mot de passe et de matricule
//	@PrePersist
//	@PreUpdate
//	public void generatePassword() {
//		String TRI = "-";
//		if (prenom != null && cinNumber != null && telephone != null) {
//			this.password = cinNumber + TRI + prenom + TRI + cinNumber;
//		}
//	}
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "personne_roles", joinColumns = @JoinColumn(name = "personne_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	public Personne() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Personne(String email,String prenom,String password) {
		super();
		this.prenom = prenom;
		this.email = email;
		this.password = password;
	}
	
	

	public Personne(String nom, String prenom, String email, @NotBlank @Size(max = 10) String cinNumber,
			@NotBlank @Size(max = 8) String telephone, String password) {
		super();
		this.nom = nom;
		this.prenom = prenom;
		this.email = email;
		this.cinNumber = cinNumber;
		this.telephone = telephone;
		this.password = password;
	}

}
