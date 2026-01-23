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

import com.university.manager.Dto.CandidatureDTO;
import com.university.manager.models.Candidature;
import com.university.manager.models.JobOfferForm;
import com.university.manager.repositories.CandidatureRepository;
import com.university.manager.repositories.JobOfferFormRepository;
import com.university.manager.services.FileStorageService;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/candidatures")
@CrossOrigin(origins = "http://localhost:3000") // Autoriser les requêtes depuis React
public class CandidatureController {

	@Autowired
	private CandidatureRepository candidatureRepository;
	
	@Autowired
	private JobOfferFormRepository jobOfferFormRepository;

	@Autowired
	private FileStorageService fileStorageService;

	@GetMapping
	public List<Candidature> getAllCandidatures() {
		return candidatureRepository.findAll();
	}

	@GetMapping("/job/{jobId}")
	public ResponseEntity<List<CandidatureDTO>> getCandidaturesByJobId(@PathVariable Long jobId) {
		List<Candidature> candidatures = candidatureRepository.getCandidaturesByJobId(jobId);
		List<CandidatureDTO> candidatureDTOs = convertToDTOList(candidatures);
		return ResponseEntity.ok(candidatureDTOs);
	}

	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public Candidature createCandidature(@RequestParam("cv") MultipartFile cvFile,
			@RequestParam("lettreMotivation") MultipartFile lettreFile, @RequestParam("jobOfferId") Long jobOfferId)
			throws IOException {

		Candidature candidature = new Candidature();
		candidature.setCvPath(fileStorageService.storeFile(cvFile));
		candidature.setLettreMotivationPath(fileStorageService.storeFile(lettreFile));

		JobOfferForm jobOffer = jobOfferFormRepository.findById(jobOfferId)
				.orElseThrow(() -> new RuntimeException("Job offer not found"));
		candidature.setJobOffer(jobOffer);
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

	private CandidatureDTO convertToDTO(Candidature candidatureForm) {
		if (candidatureForm == null) {
			return null;
		}

		CandidatureDTO dto = new CandidatureDTO();
		dto.setId(candidatureForm.getId());
		dto.setCvPath(candidatureForm.getCvPath());
		dto.setLettreMotivationPath(candidatureForm.getLettreMotivationPath());
		dto.setCreatedAt(candidatureForm.getCreatedAt());
		dto.setUpdatedAt(candidatureForm.getUpdatedAt());

		if (candidatureForm.getJobOffer() != null) {
			dto.setJobOfferId(candidatureForm.getJobOffer().getId());
		}

		return dto;
	}

	// Convertir une liste d'entités en liste de DTOs
	private List<CandidatureDTO> convertToDTOList(List<Candidature> candidatureForms) {
		if (candidatureForms == null) {
			return List.of();
		}

		return candidatureForms.stream().map(this::convertToDTO).collect(Collectors.toList());
	}

}
