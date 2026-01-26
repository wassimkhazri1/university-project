package com.university.manager.Dto;

import lombok.Data;

@Data
public class PersonneDTO {
	
	
	private Long id;
	private String nom;
	private String prenom;
	private String email;
	private String cinNumber;
	private String telephone;
	public PersonneDTO() {
		super();
	}
	public PersonneDTO(Long id, String nom, String prenom, String email, String cinNumber, String telephone) {
		super();
		this.id = id;
		this.nom = nom;
		this.prenom = prenom;
		this.email = email;
		this.cinNumber = cinNumber;
		this.telephone = telephone;
	}
		

}
