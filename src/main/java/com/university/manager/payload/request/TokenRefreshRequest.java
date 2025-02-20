package com.university.manager.payload.request;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import jakarta.validation.constraints.NotBlank;

public class TokenRefreshRequest {
	@NotBlank
	private String refreshToken;

	public String getRefreshToken() {
		return refreshToken;
	}

	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}
}
