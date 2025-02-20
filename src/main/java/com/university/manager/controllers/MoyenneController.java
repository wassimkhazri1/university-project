package com.university.manager.controllers;

import java.util.List;
import java.util.Optional;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.university.manager.models.Etudiant;
import com.university.manager.models.Moyenne;
import com.university.manager.models.Note;
import com.university.manager.repositories.EtudiantRepository;
import com.university.manager.services.MoyenneService;
import com.university.manager.services.NoteService;

@RestController
@RequestMapping("/api/moyennes")
public class MoyenneController {

	@Autowired
	private MoyenneService moyenneService;
	@Autowired
	private NoteService noteService;

	@Autowired
	private EtudiantRepository etudiantRepository;

	@GetMapping
	public List<Moyenne> getAllMoyennes() {
		return moyenneService.getAllMoyennes();
	}

	@PostMapping("/{id}")
	public Moyenne addMoyenne(@PathVariable Long id) {
		List<Note> note = noteService.getNotesByEtudiant(id);
		// Long etudiantid = moyenneService.findEtuById(id);
		Etudiant etudiant = etudiantRepository.findByCodeId(id);
		long len = note.size();
		Double moy = 0.0;
		Double som = 0.0;
		Double somcoef = 0.0;
		Moyenne moyenne = new Moyenne();
		for (int i = 0; i < len; i++) {
			som += note.get(i).getMoyenne() * note.get(i).getCoefMoyenne();
			somcoef += note.get(i).getCoefMoyenne();

		}
		// pour calculer la moyenne
		moy = som / somcoef;
		moyenne.setEtudiant(etudiant);
		moyenne.setMoy(moy);
		Optional<Moyenne> existingMoyenne = moyenneService.findByEtudiantId(id);
		if (existingMoyenne.isPresent()) {
			moyenne.setId(existingMoyenne.get().getId());
			return moyenneService.modifierMoyenne(moyenne);

		} else {
			return moyenneService.ajouterMoyenne(moyenne);
		}

		// moyenne.getEtudiant().setId(id);

	}

}
