package com.university.manager.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.university.manager.Dto.EntrepriseInfoDTO;
import com.university.manager.models.Entreprise;
import com.university.manager.repositories.EntrepriseRepository;
import com.university.manager.services.EntrepriseService;

@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React app
@RestController
@RequestMapping("/api/entreprises")
public class EntrepriseController {
	
	@Autowired
	private EntrepriseService entrepriseService;

	@Autowired
	private EntrepriseRepository entrepriseRepository;

	
	@GetMapping
	public List<Entreprise> getAllEntreprises() {
		return entrepriseService.getAllEntreprises();
	}
}
