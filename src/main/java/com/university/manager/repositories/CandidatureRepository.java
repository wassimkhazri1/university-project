package com.university.manager.repositories;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import com.university.manager.models.Candidature;
import com.university.manager.models.JobOfferForm;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CandidatureRepository extends JpaRepository<Candidature, Long> {

	// recupérer les offres par entreprise
	@Query("SELECT c from Candidature c where c.jobOffer.id = :jobId")
	List<Candidature> getCandidaturesByJobId(@Param("jobId") Long jobId);
	
	
}
