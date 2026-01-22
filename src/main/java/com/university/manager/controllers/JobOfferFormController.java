package com.university.manager.controllers;

import com.university.manager.Dto.AbsenceDTO;
import com.university.manager.Dto.JobOfferFormDTO;
import com.university.manager.models.Absence;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import com.university.manager.models.JobOfferForm;
import com.university.manager.services.JobOfferFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/job-offers")
public class JobOfferFormController {

	private final JobOfferFormService jobOfferFormService;

	@Autowired
	public JobOfferFormController(JobOfferFormService jobOfferFormService) {
		this.jobOfferFormService = jobOfferFormService;
	}

	@GetMapping
	public ResponseEntity<List<JobOfferFormDTO>> getAllJobOffers() {
		List<JobOfferForm> jobs = jobOfferFormService.getAllJobOffers();
		List<JobOfferFormDTO> jobDTOs = convertToDTOList(jobs);
		return ResponseEntity.ok(jobDTOs);
	}

	@GetMapping("/{id}")
	public ResponseEntity<JobOfferForm> getJobOfferById(@PathVariable Long id) {
		return ResponseEntity.ok(jobOfferFormService.getJobOfferById(id));
	}
	
    @GetMapping("/entreprise/{entrepriseId}")
    public ResponseEntity<List<JobOfferFormDTO>> getJobsByEntreprise(@PathVariable Long entrepriseId) {
        List<JobOfferForm> jobs = jobOfferFormService.getJobsByEntreprise(entrepriseId);
        List<JobOfferFormDTO> jobDTOs = convertToDTOList(jobs);
        return ResponseEntity.ok(jobDTOs);
    }
	
	
	

	@PostMapping
	public JobOfferForm createJobOffer(@RequestBody JobOfferForm jobOfferForm) {
		return jobOfferFormService.createJobOffer(jobOfferForm);
	}

	@PutMapping("/{id}")
	public ResponseEntity<JobOfferForm> updateJobOffer(@PathVariable Long id,
			@RequestBody JobOfferForm jobOfferFormDetails) {
		return ResponseEntity.ok(jobOfferFormService.updateJobOffer(id, jobOfferFormDetails));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteJobOffer(@PathVariable Long id) {
		jobOfferFormService.deleteJobOffer(id);
		return ResponseEntity.ok().build();
	}

	private JobOfferFormDTO convertToDTO(JobOfferForm jobOfferForm) {
		if (jobOfferForm == null) {
			return null;
		}

		JobOfferFormDTO dto = new JobOfferFormDTO();
		dto.setId(jobOfferForm.getId());
		dto.setCompany(jobOfferForm.getCompany());
		dto.setJobTitle(jobOfferForm.getJobTitle());
		dto.setEmail(jobOfferForm.getEmail());
		dto.setPhone(jobOfferForm.getPhone());
		dto.setJobPositions(jobOfferForm.getJobPositions());
		dto.setDescription(jobOfferForm.getDescription());
		dto.setStartDate(jobOfferForm.getStartDate());
		dto.setExpiryDate(jobOfferForm.getExpiryDate());
		dto.setFormations(jobOfferForm.getFormations());
        if(jobOfferForm.getEntreprise() != null) {
           dto.setEntrepriseId(jobOfferForm.getEntreprise().getId());
        }
//        if (jobOfferForm.getEtudiant() != null) {
//            dto.setEtudiantId(jobOfferForm.getEtudiant().getId());
//            dto.setEtudiantNom(jobOfferForm.getEtudiant().getNom());
//            dto.setEtudiantPrenom(jobOfferForm.getEtudiant().getPrenom());
//            dto.setEtudiantMatricule(jobOfferForm.getEtudiant().getMatricule());
//        }

//        if (absence.getMatiere() != null) {
//            dto.setMatiereId(absence.getMatiere().getId());
//            dto.setMatiereNom(absence.getMatiere().getNom());
//            dto.setMatiereCode(absence.getMatiere().getCode());
//        }

		return dto;
	}

	// Convertir une liste d'entités en liste de DTOs
	private List<JobOfferFormDTO> convertToDTOList(List<JobOfferForm> JobOfferForms) {
		if (JobOfferForms == null) {
			return List.of();
		}

		return JobOfferForms.stream().map(this::convertToDTO).collect(Collectors.toList());
	}
}