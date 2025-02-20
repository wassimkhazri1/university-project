package com.university.manager.security.services;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.Set;

@Service
public class TokenBlacklistServiceImpl implements TokenBlacklistService {

	private Set<String> blacklistedTokens = new HashSet<>();

	@Override
	public void blacklistToken(String token) {
		blacklistedTokens.add(token);
	}

	@Override
	public boolean isTokenBlacklisted(String token) {
		return blacklistedTokens.contains(token);
	}
}
