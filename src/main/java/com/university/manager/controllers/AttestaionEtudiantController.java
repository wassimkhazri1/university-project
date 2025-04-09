package com.university.manager.controllers;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import com.university.manager.models.Etudiant;
import com.university.manager.models.Groupe;
import com.university.manager.models.NiveauScol;
import com.university.manager.payload.AttestationRequest;
import com.university.manager.repositories.EtudiantRepository;

import com.university.manager.services.PdfGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React app
@RestController
@RequestMapping("/api/attestationEtudiant")
public class AttestaionEtudiantController {

	@Autowired
	private EtudiantRepository etudiantRepository;

	@Autowired
	private PdfGeneratorService pdfGeneratorService;

	@PostMapping("/generate/{id}")
	public ResponseEntity<byte[]> generateAttestation(@PathVariable Long id, @RequestBody AttestationRequest request) {

		Optional<Etudiant> etudiant = etudiantRepository.findById(id);

		if (etudiant.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		Groupe groupe = etudiant.get().getGroupe();
		NiveauScol niveauscol = etudiant.get().getNiveauScol();
		
		request.setFirstName(etudiant.get().getNom());
		request.setLastName(etudiant.get().getPrenom());
		request.setEmail(etudiant.get().getEmail());
		request.setCinNumber(etudiant.get().getCinNumber());
	    request.setMatricule(etudiant.get().getMatricule());
		request.setNiveauScolaire(typeNiveauScol(niveauscol));
		request.setGroupe(typeGroupe(groupe));

		ByteArrayInputStream bis = pdfGeneratorService.generateAttestationPdf(request);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Disposition", "inline; filename=attestation_inscription.pdf");

		return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(bis.readAllBytes());
	}
	
	// Méthode pour déterminer le type d'année
	public String typeNiveauScol(NiveauScol niveauScol) {
		switch (niveauScol.getNom()) {
		case "PREMIERE_ANNEE":
			return "1 ère année";
		case "DEUXIEME_ANNEE":
			return "2 ème année";
		case "TROISIEME_ANNE":
			return "3 ème année";

		default:
			return "";
		}
	}

	// Méthode pour déterminer le type de groupe
	public String typeGroupe(Groupe groupe) {
		switch (groupe.getName()) {
		case GROUPE_1:
			return "groupe 1";
		case GROUPE_2:
			return "groupe 2";
		default:
			return "";
		}
	}
}
