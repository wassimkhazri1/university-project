package com.university.manager.controllers;

import java.util.List;
import java.util.stream.Collectors;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.university.manager.Dto.AbsenceDTO;
import com.university.manager.Dto.MatiereDTO;
import com.university.manager.Dto.NoteDTO;
import com.university.manager.models.Absence;
import com.university.manager.models.Matiere;
import com.university.manager.models.Note;
import com.university.manager.security.jwt.JwtUtils;
import com.university.manager.security.services.UserDetailsImpl;
import com.university.manager.services.MatiereService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/matieres")
public class MatiereController {

	@Autowired
	private MatiereService matiereService;

	@Autowired
	JwtUtils jwtUtils;

	@GetMapping
	public List<MatiereDTO> getAllMatieres() {
		 
		List<Matiere> Matieres = matiereService.getAllMatieres();
		return Matieres.stream().map(this::mapToMatiereDTO).collect(Collectors.toList());

	}

	private MatiereDTO mapToMatiereDTO(Matiere matiere) {
		MatiereDTO matiereDTO = new MatiereDTO();
		matiereDTO.setId(matiere.getId());
		matiereDTO.setNom(matiere.getNom());
		matiereDTO.setCodeIntitule(matiere.getCodeIntitule());
		matiereDTO.setSemestreId(matiere.getSemestre().getId());
		matiereDTO.setNatureId(matiere.getNature().getId());
        matiereDTO.setNatureNom(matiere.getNature().getNom());
        matiereDTO.setSemestreNom(matiere.getSemestre().getNom());
		return matiereDTO;

	}


//	@GetMapping
//	public ResponseEntity<List<MatiereDTO>> getAllMatieres() {
//		List<Matiere> Matieres = matiereService.getAllMatieres();
//        List<MatiereDTO> absenceDTOs = convertToDTOList(Matieres);
//        return ResponseEntity.ok(absenceDTOs);
//		
//	}
	
	@PostMapping
	public Matiere addMatiere(@RequestBody Matiere matiere) {
		return matiereService.ajouterNote(matiere);
	}
	

//    private MatiereDTO convertToDTO(Matiere matiere) {
//        if (matiere == null) {
//            return null;
//        }
//        
//        MatiereDTO dto = new MatiereDTO();
//        dto.setId(matiere.getId());
//        dto.setNom(matiere.getNom());
//        dto.setCodeIntitule(matiere.getCodeIntitule());
//        dto.setSemestreId(matiere.getSemestre().getId());
//        dto.setNatureId(matiere.getNature().getId());
//        dto.setSemestreNom(matiere.getSemestre().getNom());
//        dto.setNatureNom(matiere.getNature().getNom());
//        
//        return dto;
//    }
//	
//	
//    // Convertir une liste d'entités en liste de DTOs
//    private List<MatiereDTO> convertToDTOList(List<Matiere> matieres) {
//        if (matieres == null) {
//            return List.of();
//        }
//        
//        return matieres.stream()
//            .map(this::convertToDTO)
//            .collect(Collectors.toList());
//    }

}
