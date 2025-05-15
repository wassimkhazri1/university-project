package com.university.manager.controllers;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import com.university.manager.models.JobOfferForm;
import com.university.manager.services.JobOfferFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-offers")
public class JobOfferFormController {

    private final JobOfferFormService jobOfferFormService;

    @Autowired
    public JobOfferFormController(JobOfferFormService jobOfferFormService) {
        this.jobOfferFormService = jobOfferFormService;
    }

    @GetMapping
    public List<JobOfferForm> getAllJobOffers() {
        return jobOfferFormService.getAllJobOffers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobOfferForm> getJobOfferById(@PathVariable Long id) {
        return ResponseEntity.ok(jobOfferFormService.getJobOfferById(id));
    }

    @PostMapping
    public JobOfferForm createJobOffer(@RequestBody JobOfferForm jobOfferForm) {
        return jobOfferFormService.createJobOffer(jobOfferForm);
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobOfferForm> updateJobOffer(@PathVariable Long id, @RequestBody JobOfferForm jobOfferFormDetails) {
        return ResponseEntity.ok(jobOfferFormService.updateJobOffer(id, jobOfferFormDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJobOffer(@PathVariable Long id) {
        jobOfferFormService.deleteJobOffer(id);
        return ResponseEntity.ok().build();
    }
}