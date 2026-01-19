package com.university.manager.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.university.manager.Dto.EntrepriseInfoDTO;
import com.university.manager.models.Branche;
import com.university.manager.models.Classe;
import com.university.manager.models.ERole;
import com.university.manager.models.Entreprise;
import com.university.manager.models.Etudiant;
import com.university.manager.models.Groupe;
import com.university.manager.models.NiveauScol;
import com.university.manager.models.Role;
import com.university.manager.repositories.EntrepriseRepository;
import com.university.manager.repositories.PersonneRepository;
import com.university.manager.repositories.RoleRepository;

@Service
public class EntrepriseService {

	@Autowired
	private EntrepriseRepository entrepriseRepository;

	@Autowired
	private PersonneRepository personneRepository;

	@Autowired
	private RoleRepository roleRepository;
	@Autowired
	PasswordEncoder encoder;

	@SuppressWarnings("unchecked")
	public Entreprise ajouterEntreprise(Entreprise entreprise) {
		Optional<Role> roleOptional = Optional.of(roleRepository.findByName(ERole.ROLE_ENTREPRISE)
				.orElseThrow(() -> new RuntimeException("Rôle non trouvé")));

		if (roleOptional.isPresent()) {
			Role role = roleOptional.get();
			entreprise.getRoles().add(role);
			System.out.println("Rôle trouvé : " + role.getName());
		} else {
			System.out.println("Rôle non trouvé");
		}

		String nom = entreprise.getNom();
		String prenom = entreprise.getPrenom();
		String email = entreprise.getEmail();
		String cinNumber = entreprise.getCinNumber();
		String telephone = entreprise.getTelephone();
		String password = entreprise.getPassword();

		String matricule = entreprise.getMatricule();
		String nomcompany = entreprise.getNomcompany();
		String owner = entreprise.getOwner();
		String adresse = entreprise.getAdresse();
		String fax = entreprise.getFax();
		String web = entreprise.getWeb();
		String linkedin = entreprise.getLinkedin();

		entreprise.setMatricule(matricule);
		entreprise.setNomcompany(nomcompany);
		entreprise.setOwner(owner);
		entreprise.setAdresse(adresse);
		entreprise.setFax(fax);
		entreprise.setWeb(web);
		entreprise.setLinkedin(linkedin);

		entreprise.setNom(nom);
		entreprise.setPrenom(prenom);
		entreprise.setCinNumber(cinNumber);
		entreprise.setEmail(email);
		entreprise.setTelephone(telephone);
		entreprise.setPassword(encoder.encode(password));

		return entrepriseRepository.save(entreprise);
	}

	public List<Entreprise> getAllEntreprises() {
		return entrepriseRepository.findEntreprises();
	}

}
