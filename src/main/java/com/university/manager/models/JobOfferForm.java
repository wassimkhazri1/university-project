package com.university.manager.models;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "joboffers")
@Getter
@Setter
public class JobOfferForm {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String company;
	private String responsible;
	private String address;
	private String phone;
	private String email;
	private String fax;
	private String website;
	private String jobPositions;
	private String jobTitle;
	private String description;
	private String startDate;
	private String expiryDate;
	private List<String> formations;

	@OneToMany(mappedBy = "jobOffer", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Candidature> candidatures = new ArrayList<>();

}
