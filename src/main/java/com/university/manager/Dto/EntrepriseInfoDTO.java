package com.university.manager.Dto;

import java.util.Date;

import lombok.Data;

@Data
public class EntrepriseInfoDTO {

	private Long id;
	private String nom;
	private String prenom;
	private String email;
	private String cinNumber;
	private String telephone;
	private String matricule;
	private String nomcompany;
	private String owner;
	private String rhresponsible;
	private String adresse;
	private String fax;
	private String web;
	private String linkedin;
	
	public EntrepriseInfoDTO() {
		super();
	}

	public EntrepriseInfoDTO(Long id, String nom, String prenom, String email, String cinNumber, String telephone,
			String matricule, String nomcompany, String owner, String rhresponsible, String adresse, String fax,
			String web, String linkedin) {
		super();
		this.id = id;
		this.nom = nom;
		this.prenom = prenom;
		this.email = email;
		this.cinNumber = cinNumber;
		this.telephone = telephone;
		this.matricule = matricule;
		this.nomcompany = nomcompany;
		this.owner = owner;
		this.rhresponsible = rhresponsible;
		this.adresse = adresse;
		this.fax = fax;
		this.web = web;
		this.linkedin = linkedin;
	}
	
	

}
