package com.university.manager.security.services;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
public interface TokenBlacklistService {
	void blacklistToken(String token);

	boolean isTokenBlacklisted(String token);
}
