package com.university.manager.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import org.springframework.stereotype.Service;

import com.university.manager.models.Classe;
import com.university.manager.models.Personne;
import com.university.manager.models.Professeur;
import com.university.manager.repositories.ClasseRepository;

import com.university.manager.repositories.PersonneRepository;
import com.university.manager.repositories.ProfesseurRepository;

@Service
public class ProfesseurService {
	@Autowired
	private ProfesseurRepository professeurRepository;

	@Autowired
	private PersonneRepository personneRepository;

	@Autowired
	private ClasseRepository classeRepository;

	public Professeur ajouterProfesseur(Professeur professeur) {
		// Créer et sauvegarder la Personne
		Personne personne = new Personne();
		personne.setNom(professeur.getPersonne().getNom());
		personne.setPrenom(professeur.getPersonne().getPrenom());
		personne.setCinNumber(professeur.getPersonne().getCinNumber());
		personne.setEmail(professeur.getPersonne().getEmail());
		personne.setTelephone(professeur.getPersonne().getTelephone());
		personne = personneRepository.save(personne);

		List<Classe> classes = classeRepository.findClassesByProfesseurId(professeur.getId());

		// Associer le professeur
		// Professeur professeur = new Professeur();
		professeur.setPersonne(personne);
		professeur.setClasses(classes);

		return professeurRepository.save(professeur);
	}

//	public Professeur modifierProfesseur(Long professeurId, Professeur professeurDetails) {
//		// Vérifier si le professeur existe
//		Professeur professeur = professeurRepository.findById(professeurId)
//				.orElseThrow(() -> new RuntimeException("Étudiant non trouvé !"));
//
//		List<Classe> classes = classeRepository.findClassesByProfesseurId(professeur.getId());
//
//		professeur.setClasses(classes);
//
//		return professeurRepository.save(professeur);
//	}

	public Professeur addProfesseur(Professeur professeur) {

		return professeurRepository.save(professeur);
	}

	public List<Professeur> getAllProfesseurs() {

		return professeurRepository.findAll();
	}

	public void deleteProfesseur(Long id) {
		professeurRepository.deleteById(id);
	}

}
