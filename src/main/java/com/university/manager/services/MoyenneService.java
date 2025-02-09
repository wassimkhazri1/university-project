package com.university.manager.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.university.manager.models.Moyenne;
import com.university.manager.repositories.MoyenneRepository;

@Service
public class MoyenneService {

	@Autowired
	private MoyenneRepository moyenneRepository;

	public List<Moyenne> getAllMoyennes() {
		// TODO Auto-generated method stub
		return moyenneRepository.findAll();
	}

	public Moyenne ajouterMoyenne(Moyenne moyenne) {
		// TODO Auto-generated method stub
		return moyenneRepository.save(moyenne);
	}

	public Long findEtuById(Long codeid) {
	    return moyenneRepository.findEtuById(codeid)
	            .orElseThrow(() -> new RuntimeException("Aucune moyenne trouvée pour l'étudiant avec l'ID : " + codeid));
	}


	public Moyenne modifierMoyenne(Moyenne moyenne) {
		Optional<Moyenne> existingMoyenne = moyenneRepository.findByEtudiantId(moyenne.getEtudiant().getId());

		if (existingMoyenne.isPresent()) {
			Moyenne updatedMoyenne = existingMoyenne.get();
			updatedMoyenne.setMoy(moyenne.getMoy());
			return moyenneRepository.save(updatedMoyenne);
		} else {
			throw new RuntimeException(
					"Moyenne non trouvée pour l'étudiant avec l'ID : " + moyenne.getEtudiant().getId());
		}
	}

	public Optional<Moyenne> findByEtudiantId(Long etudiantId) {
		return moyenneRepository.findByEtudiantId(etudiantId);
	}

}
