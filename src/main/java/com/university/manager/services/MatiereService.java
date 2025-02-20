package com.university.manager.services;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.university.manager.models.Matiere;

import com.university.manager.repositories.MatiereRepository;

@Service
public class MatiereService {

	@Autowired
	private MatiereRepository matiereRepository;

	public List<Matiere> getAllMatieres() {
		return matiereRepository.findAll();
	}

	public Matiere ajouterNote(Matiere matiere) {
		return matiereRepository.save(matiere);
	}
}
