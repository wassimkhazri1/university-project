package com.university.manager.Dto;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import lombok.Data;

import java.util.List;

import com.university.manager.models.Candidature;

@Data
public class JobOfferFormDTO {
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
	private Long entrepriseId;
	//private List<Candidature> candidatures;
	private int candidatureCount;
	
	public JobOfferFormDTO() {

	}

	public JobOfferFormDTO(Long id, String company, String responsible, String address, String phone, String email,
			String fax, String website, String jobPositions, String jobTitle, String description, String startDate,
			String expiryDate, List<String> formations, Long entrepriseId, int candidatureCount) {
		super();
		this.id = id;
		this.company = company;
		this.responsible = responsible;
		this.address = address;
		this.phone = phone;
		this.email = email;
		this.fax = fax;
		this.website = website;
		this.jobPositions = jobPositions;
		this.jobTitle = jobTitle;
		this.description = description;
		this.startDate = startDate;
		this.expiryDate = expiryDate;
		this.formations = formations;
		this.entrepriseId = entrepriseId;
		this.candidatureCount = candidatureCount;
	}



	
	
}
