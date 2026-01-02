package com.university.manager.controllers;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.university.manager.Dto.AbsenceDTO;
import com.university.manager.models.Absence;
import com.university.manager.models.Etudiant;
import com.university.manager.repositories.AbsenceRepository;
import com.university.manager.services.AbsenceService;
import com.university.manager.services.NotificationService;

@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React app
@RestController
@RequestMapping("/api/absences")
public class AbsenceController {

	@Autowired
	private AbsenceService absenceService;
	@Autowired
	private AbsenceRepository absenceRepository;
    @Autowired
    private NotificationService notificationService;
	
	@GetMapping
	public List<Absence> getAllAbsences() {
		return absenceService.getAllAbsences();				
	}

    @PostMapping
    public Absence addAbsence(@RequestBody Absence absence) {
        // 1. Sauvegarder l'absence
        Absence savedAbsence = absenceService.addAbsence(absence);
        
        // 2. Envoyer une notification à l'étudiant
        notificationService.sendAbsenceNotification(
            savedAbsence
        );
        
        return savedAbsence;
    }

	
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<AbsenceDTO>> getAbsencesByStudent(@PathVariable Long studentId) {
        List<Absence> absences = absenceService.getAbsencesByStudent(studentId);
        List<AbsenceDTO> absenceDTOs = convertToDTOList(absences);
        return ResponseEntity.ok(absenceDTOs);
    }
    @GetMapping("/student/{studentId}/{matiereId}")
    public ResponseEntity<List<AbsenceDTO>> getAbsencesByStudentByMatiere(@PathVariable Long studentId, @PathVariable Long matiereId) {
        List<Absence> absences = absenceService.getAbsencesByStudentByMatiere(studentId,matiereId);
        List<AbsenceDTO> absenceDTOs = convertToDTOList(absences);
        return ResponseEntity.ok(absenceDTOs);
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
	
	// Convertir une entité Absence en DTO
    private AbsenceDTO convertToDTO(Absence absence) {
        if (absence == null) {
            return null;
        }
        
        AbsenceDTO dto = new AbsenceDTO();
        dto.setId(absence.getId());
        dto.setCount(absence.getCount());
        dto.setDate(absence.getDate());
        dto.setJustified(absence.isJustified());
        dto.setReason(absence.getReason());
        
        if (absence.getEtudiant() != null) {
            dto.setEtudiantId(absence.getEtudiant().getId());
            dto.setEtudiantNom(absence.getEtudiant().getNom());
            dto.setEtudiantPrenom(absence.getEtudiant().getPrenom());
            dto.setEtudiantMatricule(absence.getEtudiant().getMatricule());
        }
        
        if (absence.getMatiere() != null) {
            dto.setMatiereId(absence.getMatiere().getId());
            dto.setMatiereNom(absence.getMatiere().getNom());
            dto.setMatiereCode(absence.getMatiere().getCode());
        }
        
        return dto;
    }
    
    // Convertir une liste d'entités en liste de DTOs
    private List<AbsenceDTO> convertToDTOList(List<Absence> absences) {
        if (absences == null) {
            return List.of();
        }
        
        return absences.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    // Convertir un RequestDTO en entité Absence
//    private Absence convertToEntity(AbsenceRequestDTO requestDTO, Etudiant etudiant, Matiere matiere) {
//        if (requestDTO == null) {
//            return null;
//        }
//        
//        Absence absence = new Absence();
//        absence.setCount(requestDTO.getCount());
//        absence.setDate(requestDTO.getDate());
//        absence.setJustified(requestDTO.isJustified());
//        absence.setReason(requestDTO.getReason());
//        absence.setEtudiant(etudiant);
//        absence.setMatiere(matiere);
//        
//        return absence;
//    }
    
    // Mettre à jour une entité existante à partir d'un RequestDTO
//    private void updateEntityFromDTO(Absence absence, AbsenceRequestDTO requestDTO, 
//                                     Etudiant etudiant, Matiere matiere) {
//        if (absence == null || requestDTO == null) {
//            return;
//        }
//        
//        absence.setCount(requestDTO.getCount());
//        absence.setDate(requestDTO.getDate());
//        absence.setJustified(requestDTO.isJustified());
//        absence.setReason(requestDTO.getReason());
//        absence.setEtudiant(etudiant);
//        absence.setMatiere(matiere);
//    }
}
