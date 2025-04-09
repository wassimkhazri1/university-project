package com.university.manager.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import org.springframework.stereotype.Service;

import com.university.manager.models.Branche;
import com.university.manager.models.Classe;
import com.university.manager.models.ERole;
import com.university.manager.models.Etudiant;
import com.university.manager.models.Groupe;
import com.university.manager.models.NiveauScol;
import com.university.manager.models.Personne;
import com.university.manager.models.Professeur;
import com.university.manager.models.Role;
import com.university.manager.repositories.ClasseRepository;

import com.university.manager.repositories.PersonneRepository;
import com.university.manager.repositories.ProfesseurRepository;
import com.university.manager.repositories.RoleRepository;

@Service
public class ProfesseurService {
	@Autowired
	private ProfesseurRepository professeurRepository;

	@Autowired
	private PersonneRepository personneRepository;

	@Autowired
	private ClasseRepository classeRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

//	public Professeur ajouterProfesseur(Professeur professeur) {
//		// Créer et sauvegarder la Personne
//		Personne personne = new Personne();
//		personne.setNom(professeur.getPersonne().getNom());
//		personne.setPrenom(professeur.getPersonne().getPrenom());
//		personne.setCinNumber(professeur.getPersonne().getCinNumber());
//		personne.setEmail(professeur.getPersonne().getEmail());
//		personne.setTelephone(professeur.getPersonne().getTelephone());
//		personne = personneRepository.save(personne);
//
//		List<Classe> classes = classeRepository.findClassesByProfesseurId(professeur.getId());
//
//		// Associer le professeur
//		// Professeur professeur = new Professeur();
//		professeur.setPersonne(personne);
//		professeur.setClasses(classes);
//
//		return professeurRepository.save(professeur);
//	}

	// @SuppressWarnings("unchecked")
	public Professeur ajouterProfesseur(Professeur professeur) {
		Optional<Role> roleOptional = roleRepository.findByName(ERole.ROLE_PROF);
		if (roleOptional.isPresent()) {
			Role role = roleOptional.get();
			professeur.getRoles().add(role);
			System.out.println("Rôle trouvé : " + role.getName());
		} else {
			System.out.println("Rôle non trouvé");
		}

		String nom = professeur.getNom();
		String prenom = professeur.getPrenom();
		String email = professeur.getEmail();
		String cinNumber = professeur.getCinNumber();
		String telephone = professeur.getTelephone();
		String password = professeur.getPassword();
		// Set<String> role = signUpRequest.getRole();
		List<Classe> classes = professeur.getClasses();

		professeur.setNom(nom);
		professeur.setPrenom(prenom);
		professeur.setCinNumber(cinNumber);
		professeur.setEmail(email);
		professeur.setTelephone(telephone);
		professeur.setPassword(encoder.encode(password));
		professeur.setClasses(classes);

		// Vérifier si le groupe, la classe et le niveau existent
		// List<Classe> classes =
		// classeRepository.findClassesByProfesseurId(professeur.getId());
		// .orElseThrow(() -> new RuntimeException("Classes non trouvée !"));

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
