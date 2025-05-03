package com.university.manager.controllers;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.university.manager.models.Absence;
import com.university.manager.models.Etudiant;
import com.university.manager.repositories.AbsenceRepository;
import com.university.manager.services.AbsenceService;

@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React app
@RestController
@RequestMapping("/api/absences")
public class AbsenceController {

	@Autowired
	private AbsenceService absenceService;
	@Autowired
	private AbsenceRepository absenceRepository;

	@GetMapping
	public List<Absence> getAllAbsences() {
		return absenceService.getAllAbsences();
	}

//	@PostMapping
//	public Absence addAbsence(@RequestBody Absence absence) {
//		return absenceService.ajouterAbsence(absence);
//	}

    @PostMapping
    public Absence addAbsence(@RequestBody Absence absence) {
        return absenceService.addAbsence(absence);
    }

    @GetMapping("/student/{studentId}")
    public List<Absence> getStudentAbsences(@PathVariable Long studentId) {
        return absenceService.getAbsencesByStudent(studentId);
    }
	
	
	
	// Mettre à jour un les absences
	@PutMapping("/{id}")
	public ResponseEntity<Absence> updateAbsence(@PathVariable Long id) {
		Optional<Absence> absenceOptional = absenceRepository.findById(id);
		if (absenceOptional.isPresent()) {
			Absence absence = absenceOptional.get();
			int count = 1;
			if (absence.getCount() < 3) {
				count += absence.getCount();
				absence.setCount(count);
			}
			absenceRepository.save(absence);
			return ResponseEntity.ok(absence);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}
