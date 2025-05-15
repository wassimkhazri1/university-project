package com.university.manager.Dto;

import lombok.Getter;
import lombok.Setter;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
@Getter
@Setter
public class UserDTO {

	private Long id;
	private String firstName;
	private String lastName;
	private String email;
	private String cinNumber;
	private String matricule;
	private String password;
	private String niveauScolaire;
//    private String groupe;
	private Long groupeId;
	private String photo;
	private Long roleId;
}
