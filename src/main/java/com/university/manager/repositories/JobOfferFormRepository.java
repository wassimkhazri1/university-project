package com.university.manager.repositories;

import com.university.manager.models.Absence;
import com.university.manager.models.JobOfferForm;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface JobOfferFormRepository extends JpaRepository<JobOfferForm, Long> {
	
	
	// recupérer les offres par entreprise
	@Query("SELECT j FROM JobOfferForm j WHERE j.entreprise.id = :entrepiseId")
	List<JobOfferForm> findByEntrepriseId(@Param("entrepiseId") Long entrepriseId);
}
