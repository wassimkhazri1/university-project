package com.university.manager.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.university.manager.models.Matiere;

import com.university.manager.services.MatiereService;

@RestController
@RequestMapping("/api/matieres")
public class MatiereController {

	@Autowired
	private MatiereService matiereService;

	@GetMapping
	public List<Matiere> getAllMatieres() {
		return matiereService.getAllMatieres();
	}

	@PostMapping
	public Matiere addMatiere(@RequestBody Matiere matiere) {
		return matiereService.ajouterNote(matiere);
	}

}
