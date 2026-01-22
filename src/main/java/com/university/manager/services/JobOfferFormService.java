package com.university.manager.services;

import com.university.manager.Dto.AbsenceDTO;
import com.university.manager.Dto.JobOfferFormDTO;
import com.university.manager.models.Absence;
import com.university.manager.models.JobOfferForm;
import com.university.manager.repositories.JobOfferFormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobOfferFormService {

    private final JobOfferFormRepository jobOfferFormRepository;

    @Autowired
    public JobOfferFormService(JobOfferFormRepository jobOfferFormRepository) {
        this.jobOfferFormRepository = jobOfferFormRepository;
    }

    public List<JobOfferForm> getAllJobOffers() {
        return jobOfferFormRepository.findAll();
    }

    public JobOfferForm getJobOfferById(Long id) {
        return jobOfferFormRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job Offer not found with id: " + id));
    }

    public JobOfferForm createJobOffer(JobOfferForm jobOfferForm) {
        return jobOfferFormRepository.save(jobOfferForm);
    }

    public JobOfferForm updateJobOffer(Long id, JobOfferForm jobOfferFormDetails) {
        JobOfferForm jobOfferForm = getJobOfferById(id);
        
        jobOfferForm.setCompany(jobOfferFormDetails.getCompany());
        jobOfferForm.setResponsible(jobOfferFormDetails.getResponsible());
        jobOfferForm.setAddress(jobOfferFormDetails.getAddress());
        jobOfferForm.setPhone(jobOfferFormDetails.getPhone());
        jobOfferForm.setEmail(jobOfferFormDetails.getEmail());
        jobOfferForm.setFax(jobOfferFormDetails.getFax());
        jobOfferForm.setWebsite(jobOfferFormDetails.getWebsite());
        jobOfferForm.setJobPositions(jobOfferFormDetails.getJobPositions());
        jobOfferForm.setJobTitle(jobOfferFormDetails.getJobTitle());
        jobOfferForm.setDescription(jobOfferFormDetails.getDescription());
        jobOfferForm.setStartDate(jobOfferFormDetails.getStartDate());
        jobOfferForm.setExpiryDate(jobOfferFormDetails.getExpiryDate());
        jobOfferForm.setFormations(jobOfferFormDetails.getFormations());
        
        return jobOfferFormRepository.save(jobOfferForm);
    }

    public void deleteJobOffer(Long id) {
        JobOfferForm jobOfferForm = getJobOfferById(id);
        jobOfferFormRepository.delete(jobOfferForm);
    }
	// Convertir une entité Absence en DTO
    
	public List<JobOfferForm> getJobsByEntreprise(Long entrepriseId) {
		// TODO Auto-generated method stub
		return jobOfferFormRepository.findByEntrepriseId(entrepriseId);
	}   

}
