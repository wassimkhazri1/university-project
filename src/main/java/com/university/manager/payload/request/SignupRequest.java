package com.university.manager.payload.request;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import java.util.Set;

public class SignupRequest {

	private Long id;
	private String nom;
	private String prenom;
	private String email;
	private String cinNumber;
	private String telephone;
	private String password;
	private Set<String> role;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCinNumber() {
		return cinNumber;
	}

	public void setCinNumber(String cinNumber) {
		this.cinNumber = cinNumber;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<String> getRole() {
		return role;
	}

	public void setRole(Set<String> role) {
		this.role = role;
	}

}
