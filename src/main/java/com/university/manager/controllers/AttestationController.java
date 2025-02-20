package com.university.manager.controllers;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import com.university.manager.models.User;
import com.university.manager.payload.AttestationRequest;
import com.university.manager.repositories.UserRepository;
import com.university.manager.services.PdfGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React app
@RestController
@RequestMapping("/api/attestation")
public class AttestationController {
	
	@Autowired
	private UserController userController;

    @Autowired
    private UserRepository userRepository;
    
	@Autowired
	private PdfGeneratorService pdfGeneratorService;

	@PostMapping("/generate/{id}")
	public ResponseEntity<byte[]> generateAttestation(@PathVariable Long id, @RequestBody AttestationRequest request) {
		

		Optional<User> user = userRepository.findById(id);
		
		if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

		request.setFirstName(user.get().getFirstName());
		request.setLastName(user.get().getLastName());
		request.setEmail(user.get().getEmail());
		request.setCinNumber(user.get().getCinNumber());
		request.setMatricule(user.get().getMatricule());
		request.setNiveauScolaire(user.get().getNiveauScolaire());
	//	request.setGroupe(user.get().getGroupe());
		request.setGroupe(user.getClass().getName());
		
		ByteArrayInputStream bis = pdfGeneratorService.generateAttestationPdf(request);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Disposition", "inline; filename=attestation_inscription.pdf");

		return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(bis.readAllBytes());
	}
}
