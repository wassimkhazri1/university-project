package com.university.manager.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.university.manager.repositories.PersonneRepository;
import com.university.manager.models.Personne;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	PersonneRepository personneRepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Personne user = personneRepository.findByPrenom(username)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
		return UserDetailsImpl.build(user);
	}

}
