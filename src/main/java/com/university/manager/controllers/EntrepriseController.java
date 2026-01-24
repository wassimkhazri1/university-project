package com.university.manager.controllers;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.university.manager.Dto.CandidatureDTO;
import com.university.manager.Dto.EntrepriseInfoDTO;
import com.university.manager.models.Candidature;
import com.university.manager.models.Entreprise;
import com.university.manager.models.Etudiant;
import com.university.manager.repositories.EntrepriseRepository;
import com.university.manager.services.EntrepriseService;

import lombok.Data;

@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React app
@RestController
@RequestMapping("/api/entreprises")
public class EntrepriseController {

	@Autowired
	private EntrepriseService entrepriseService;

	@Autowired
	private EntrepriseRepository entrepriseRepository;

	@GetMapping
	public ResponseEntity<List<EntrepriseInfoDTO>> getAllEntreprises() {
		List<Entreprise> entreprises = entrepriseService.getAllEntreprises();
		List<EntrepriseInfoDTO> entrpriseDTOs = convertToDTOList(entreprises);
		return ResponseEntity.ok(entrpriseDTOs);
	}

	@PostMapping
	public Entreprise addEntreprise(@RequestBody Entreprise entreprise) {
		return entrepriseService.ajouterEntreprise(entreprise);
	}

	// get entreprise by id
	@GetMapping("/id/{codeId}")
	public Optional<Entreprise> getEntrepriseByCodeId(@PathVariable Long codeId) {
		return entrepriseRepository.findById(codeId);
	}

	private EntrepriseInfoDTO convertToDTO(Entreprise entreprise) {
		if (entreprise == null) {
			return null;
		}

		EntrepriseInfoDTO dto = new EntrepriseInfoDTO();

//		private String rhresponsible;		
		dto.setId(entreprise.getId());
		dto.setNom(entreprise.getNom());
		dto.setPrenom(entreprise.getPrenom());
		dto.setEmail(entreprise.getEmail());
		dto.setCinNumber(entreprise.getCinNumber());
		dto.setTelephone(entreprise.getTelephone());
		dto.setMatricule(entreprise.getMatricule());
		dto.setNomcompany(entreprise.getNomcompany());
		dto.setOwner(entreprise.getOwner());
		dto.setAdresse(entreprise.getAdresse());
		dto.setFax(entreprise.getFax());
		dto.setWeb(entreprise.getWeb());
		dto.setLinkedin(entreprise.getLinkedin());

		return dto;
	}

	// Convertir une liste d'entités en liste de DTOs
	private List<EntrepriseInfoDTO> convertToDTOList(List<Entreprise> entreprises) {
		if (entreprises == null) {
			return List.of();
		}

		return entreprises.stream().map(this::convertToDTO).collect(Collectors.toList());
	}
}
