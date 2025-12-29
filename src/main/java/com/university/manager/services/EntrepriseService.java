package com.university.manager.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.university.manager.Dto.EntrepriseInfoDTO;
import com.university.manager.models.Entreprise;
import com.university.manager.repositories.EntrepriseRepository;


@Service
public class EntrepriseService {
	
	@Autowired
	private EntrepriseRepository entrepriseRepository;

	public List<Entreprise> getAllEntreprises() {
		return entrepriseRepository.findEntreprises();
	}

}
