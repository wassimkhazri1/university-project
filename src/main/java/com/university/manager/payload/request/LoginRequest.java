package com.university.manager.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
public class LoginRequest {

//	@NotBlank
//	@Email
	private String email;
//	private String prenom;
	@NotBlank
	private String password;

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}


}
