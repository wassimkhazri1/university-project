package com.university.manager.controllers;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.university.manager.models.Candidature;
import com.university.manager.repositories.CandidatureRepository;
import com.university.manager.services.FileStorageService;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/candidatures")
@CrossOrigin(origins = "http://localhost:3000") // Autoriser les requêtes depuis React
public class CandidatureController {

	@Autowired
	private CandidatureRepository candidatureRepository;

	@Autowired
	private FileStorageService fileStorageService;

	@GetMapping
	public List<Candidature> getAllCandidatures() {
		return candidatureRepository.findAll();
	}

	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public Candidature createCandidature(@RequestParam("cv") MultipartFile cvFile,
			@RequestParam("lettreMotivation") MultipartFile lettreFile) throws IOException {

		Candidature candidature = new Candidature();
		candidature.setCvPath(fileStorageService.storeFile(cvFile));
		candidature.setLettreMotivationPath(fileStorageService.storeFile(lettreFile));

		return candidatureRepository.save(candidature);
	}

	@GetMapping("/{id}/download/cv")
	public ResponseEntity<Resource> downloadCv(@PathVariable Long id) throws IOException {
		Candidature candidature = candidatureRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Candidature non trouvée"));

		return downloadFile(candidature.getCvPath());
	}

	@GetMapping("/{id}/download/lettre")
	public ResponseEntity<Resource> downloadLettre(@PathVariable Long id) throws IOException {
		Candidature candidature = candidatureRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Candidature non trouvée"));

		return downloadFile(candidature.getLettreMotivationPath());
	}

	@DeleteMapping("/{id}")
	public void deleteCandidature(@PathVariable Long id) throws IOException {
		Candidature candidature = candidatureRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Candidature non trouvée"));

		fileStorageService.deleteFile(candidature.getCvPath());
		fileStorageService.deleteFile(candidature.getLettreMotivationPath());

		candidatureRepository.delete(candidature);
	}

	private ResponseEntity<Resource> downloadFile(String filename) throws IOException {
		Path filePath = Paths.get(fileStorageService.getUploadDir()).resolve(filename).normalize();
		Resource resource = new UrlResource(filePath.toUri());

		if (!resource.exists()) {
			throw new RuntimeException("Fichier non trouvé");
		}

		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}
}
