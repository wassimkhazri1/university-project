package com.university.manager.repositories;

import com.university.manager.models.JobOfferForm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobOfferFormRepository extends JpaRepository<JobOfferForm, Long> {
}
