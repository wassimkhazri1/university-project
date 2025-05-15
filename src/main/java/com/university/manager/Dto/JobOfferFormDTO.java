package com.university.manager.Dto;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import lombok.Data;

import java.util.List;

@Data
public class JobOfferFormDTO {
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
}
