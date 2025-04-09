package com.university.manager.controllers;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.itextpdf.text.DocumentException;
import com.university.manager.models.Branche;
import com.university.manager.models.Classe;
import com.university.manager.models.Etudiant;
import com.university.manager.models.Groupe;
import com.university.manager.models.NiveauScol;
import com.university.manager.models.Personne;
import com.university.manager.repositories.BrancheRepository;
import com.university.manager.repositories.ClasseRepository;
import com.university.manager.repositories.EtudiantRepository;
import com.university.manager.repositories.GroupRepository;
import com.university.manager.repositories.NiveauScolRepository;
import com.university.manager.repositories.PersonneRepository;
import com.university.manager.services.EtudiantService;
import com.university.manager.services.PasswordUpdateService;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React app
@RestController
@RequestMapping("/api/etudiants")
public class EtudiantController {

	@Autowired
	private EtudiantService etudiantService;

	@Autowired
	private EtudiantRepository etudiantRepository;
	@Autowired
	private PersonneRepository personneRepository;
	@Autowired
	private GroupRepository groupRepository;
	@Autowired
	private ClasseRepository classeRepository;
	@Autowired
	private NiveauScolRepository niveauScolRepository;
	@Autowired
	private BrancheRepository brancheRepository;
	@Autowired
	PasswordEncoder encoder;

	@Autowired
	public PasswordUpdateService passwordUpdateService;

	@GetMapping
	public List<Etudiant> getAllEtudiants() {
		return etudiantService.getAllEtudiants();
	}

	// get student list by classe, group, and niveauScol
	@GetMapping("/{niveauid}/{classeid}/{groupeid}")
	public List<Etudiant> getEtudiantsByGroupeClasseNiveau(@PathVariable Long groupeid, @PathVariable Long classeid,
			@PathVariable Long niveauid) {
		return etudiantRepository.findEtudiantsByGroupeClasseNiveau(niveauid, classeid, groupeid);
	}

	// get student list by niveauScol
	@GetMapping("/niveau/{niveauid}")
	public List<Etudiant> getEtudiantsByNiveau(@PathVariable Long niveauid) {
		return etudiantRepository.findEtudiantsByNiveau(niveauid);
	}

	// get student by id
	@GetMapping("/id/{codeId}")
	public Optional<Etudiant> getEtudiantByCodeId(@PathVariable Long codeId) {
//		return etudiantRepository.findByeCodeId(codeId);
		return etudiantRepository.findById(codeId);
	}

	// get student list by classe,and niveauScol
	@GetMapping("/{niveauid}/{classeid}")
	public List<Etudiant> getEtudiantsByClasseNiveau(@PathVariable Long niveauid, @PathVariable Long classeid) {
		return etudiantRepository.findEtudiantsByClasseNiveau(niveauid, classeid);
	}

	@PostMapping
	public Etudiant addEtudiant(@RequestBody Etudiant etudiant) {
		return etudiantService.ajouterEtudiant(etudiant);
	}

	// Mettre à jour un utilisateur
	@PutMapping("/{id}")
	public ResponseEntity<Etudiant> updateEtudiant(@PathVariable Long id, @RequestBody Etudiant userDetails) {
		Optional<Etudiant> etudiantOptional = etudiantRepository.findById(id);

		if (etudiantOptional.isPresent()) {
			Etudiant etudiant = etudiantOptional.get();
			System.out.println("*************Ancien Password****************");
			System.out.println("Nouveau mot de passe hashé : " + etudiant.getPassword());
			System.out.println("*****************************");
			System.out.println("*************Nouveau Password****************");
			System.out.println("Nouveau mot de passe hashé : " + userDetails.getPassword());
			System.out.println("*****************************");
			System.out.println(encoder.matches("motDePasseTest", etudiant.getPassword()));
			etudiant.setNom(userDetails.getNom());
			etudiant.setPrenom(userDetails.getPrenom());
			etudiant.setCinNumber(userDetails.getCinNumber());
			etudiant.setEmail(userDetails.getEmail());
			etudiant.setTelephone(userDetails.getTelephone());

			// Mise à jour conditionnelle du mot de passe
			if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
				etudiant.setPassword(encoder.encode(userDetails.getPassword()));

			}

			// Vérification et mise à jour du groupe
			Optional<Groupe> groupe = groupRepository.findById(userDetails.getGroupe().getId());
			groupe.ifPresent(etudiant::setGroupe);

			// Vérification et mise à jour du classe
			Optional<Classe> classe = classeRepository.findById(userDetails.getClasse().getId());
			classe.ifPresent(etudiant::setClasse);

			// Vérification et mise à jour du niveauScol
			Optional<NiveauScol> niveauScol = niveauScolRepository.findById(userDetails.getNiveauScol().getId());
			niveauScol.ifPresent(etudiant::setNiveauScol);

			// Vérification et mise à jour du branche
			Optional<Branche> branche = brancheRepository.findById(userDetails.getBranche().getId());
			branche.ifPresent(etudiant::setBranche);

			etudiantRepository.save(etudiant);
			return ResponseEntity.ok(etudiant);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping("/delete/{id}")
	public void deleteEtudiant(@PathVariable Long id) {
		etudiantService.deleteEtudiant(id);

	}

	@GetMapping("/export/pdf")
	public void exportToPdf(HttpServletResponse response) throws IOException, DocumentException {
		// Récupérer tous les utilisateurs
		List<Etudiant> etudiants = etudiantRepository.findAll();

		// Configurer la réponse HTTP pour un fichier PDF
		response.setContentType("application/pdf");
		response.setHeader("Content-Disposition", "attachment; filename=all_etudiants_operations.pdf");

		// Passer la liste des utilisateurs au service pour générer le PDF
		etudiantService.exportAllEtudiantsToPdf(etudiants, response);
	}

	// generation en pdf la liste des etudiant par niveau, classe, et group
	@GetMapping("/export/pdf/{niveauid}/{classeid}/{groupid}")
	public void exportPdf(@PathVariable Long niveauid, @PathVariable Long classeid, @PathVariable Long groupid,
			HttpServletResponse response) throws IOException, DocumentException {
		// Récupérer tous les utilisateurs
		List<Etudiant> etudiants = etudiantRepository.findEtudiantsByGroupeClasseNiveau(niveauid, classeid, groupid);

		// Configurer la réponse HTTP pour un fichier PDF
		response.setContentType("application/pdf");
		response.setHeader("Content-Disposition", "attachment; filename=all_etudiants_operations.pdf");

		// Passer la liste des utilisateurs au service pour générer le PDF
		etudiantService.exportAllEtudiantsToPdf(etudiants, response);
	}

}
