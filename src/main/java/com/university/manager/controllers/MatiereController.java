package com.university.manager.controllers;

import java.util.List;
import java.util.stream.Collectors;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.university.manager.Dto.MatiereDTO;
import com.university.manager.Dto.NoteDTO;
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
        matiereDTO.setNatureNom(matiere.getNature().getNom());
        matiereDTO.setSemestreNom(matiere.getSemestre().getNom());
		return matiereDTO;

	}

	@PostMapping
	public Matiere addMatiere(@RequestBody Matiere matiere) {
		return matiereService.ajouterNote(matiere);
	}

}
