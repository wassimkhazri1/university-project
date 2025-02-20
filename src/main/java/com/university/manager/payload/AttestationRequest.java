package com.university.manager.payload;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttestationRequest {

	@NotBlank
	@Size(max = 20)
	private String firstName;

	@NotBlank
	@Size(max = 20)
	private String lastName;

	@NotBlank
	@Email
	@Size(max = 50)
	private String email;

	@NotBlank
	@Size(max = 10)
	private String cinNumber;

	private String matricule;
	private String niveauScolaire;
	private String groupe;

}
