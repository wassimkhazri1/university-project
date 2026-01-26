package com.university.manager.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.university.manager.Dto.PersonneDTO;

import com.university.manager.models.Personne;
import com.university.manager.repositories.PersonneRepository;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React app
@RestController
@RequestMapping("/api/personnes")
public class PersonneController {

	@Autowired
	private PersonneRepository personneRepository;

	@GetMapping("/id/{codeId}")
	public Optional<PersonneDTO> getPersonneByCodeId(@PathVariable Long codeId) {
		Optional<PersonneDTO> personne = personneRepository.findPersonneByCodeId(codeId);
	//	PersonneDTO personneInfoDTO = convertToDTO(personne);

		return personne;
	}

	private PersonneDTO convertToDTO(Optional<Personne> personne) {
		if (personne == null) {
			return null;
		}

		PersonneDTO dto = new PersonneDTO();

		dto.setId(personne.get().getId());
		dto.setNom(personne.get().getNom());
		dto.setPrenom(personne.get().getPrenom());
		dto.setEmail(personne.get().getEmail());
		dto.setCinNumber(personne.get().getCinNumber());
		dto.setTelephone(personne.get().getTelephone());

		return dto;
	}

}
