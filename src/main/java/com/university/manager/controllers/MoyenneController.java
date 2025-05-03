package com.university.manager.controllers;

import java.math.RoundingMode;
import java.text.DecimalFormat;
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

import com.university.manager.Dto.MoyenneDTO;
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

	@GetMapping("/{codeId}")
	public Optional<MoyenneDTO> getMoyenne(@PathVariable Long codeId) {
		return moyenneService.findByEtudiantId1(codeId);
	}
	@PostMapping("/{codeId}")
	public Moyenne addMoyenne(@PathVariable Long codeId) {
		List<Note> note = noteService.getNotesByEtudiant(codeId);
		// Long etudiantid = moyenneService.findEtuById(id);
		// Etudiant etudiant = etudiantRepository.findByCodeId(codeId);
		Etudiant etudiant = etudiantRepository.getById(codeId);
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
		// Formatage à 2 décimales
		DecimalFormat df = new DecimalFormat("#.##");
		df.setRoundingMode(RoundingMode.HALF_UP);
		Double moye = Double.parseDouble(df.format(moy).replace(",", "."));

		moyenne.setMoy(moye);
		Optional<Moyenne> existingMoyenne = moyenneService.findByEtudiantId(codeId);
		if (existingMoyenne.isPresent()) {
			moyenne.setId(existingMoyenne.get().getId());
			return moyenneService.modifierMoyenne(moyenne);

		} else {
			return moyenneService.ajouterMoyenne(moyenne);
		}

		// moyenne.getEtudiant().setId(id);

	}

}
