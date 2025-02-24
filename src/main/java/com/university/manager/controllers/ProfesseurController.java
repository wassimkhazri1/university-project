package com.university.manager.controllers;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itextpdf.text.DocumentException;
import com.university.manager.models.Branche;
import com.university.manager.models.Classe;
import com.university.manager.models.Etudiant;
import com.university.manager.models.Group;
import com.university.manager.models.NiveauScol;
import com.university.manager.models.Personne;
import com.university.manager.models.Professeur;
import com.university.manager.repositories.ClasseRepository;
import com.university.manager.repositories.PersonneRepository;
import com.university.manager.repositories.ProfesseurRepository;
import com.university.manager.services.ProfesseurService;

import jakarta.servlet.http.HttpServletResponse;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React app
@RestController
@RequestMapping("/api/professeurs")
public class ProfesseurController {

	@Autowired
	private ProfesseurService professeurService;

	@Autowired
	private ProfesseurRepository professeurRepository;

	@Autowired
	private PersonneRepository personneRepository;

	@Autowired
	private ClasseRepository classeRepository;

	@GetMapping
	public List<Professeur> getAllProfesseurs() {
		return professeurService.getAllProfesseurs();
	}

	@PostMapping
	public Professeur addProfesseur(@RequestBody Professeur professeur) {
		return professeurService.ajouterProfesseur(professeur);
	}

	// Mettre à jour un utilisateur
	@PutMapping("/{id}")
	public ResponseEntity<Professeur> updateProfesseur(@PathVariable Long id, @RequestBody Professeur userDetails) {
		Optional<Professeur> professeurOptional = professeurRepository.findById(id);

		if (professeurOptional.isPresent()) {
			Professeur professeur = professeurOptional.get();

			// Vérification et mise à jour du personne
			Optional<Personne> personneOptional = personneRepository.findById(userDetails.getPersonne().getId());
			if (personneOptional.isPresent()) {
				Personne personne = personneOptional.get();
				professeur.setPersonne(personne);
			}

			// Vérification et mise à jour du classe

			List<Classe> classes = classeRepository.findClassesByProfesseurId(professeur.getId());
			professeur.setClasses(classes);

			professeurRepository.save(professeur);
			return ResponseEntity.ok(professeur);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping("/delete/{id}")
	public void deleteProfesseur(@PathVariable Long id) {
		professeurService.deleteProfesseur(id);

	}

}
