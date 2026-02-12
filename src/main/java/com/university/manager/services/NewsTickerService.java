package com.university.manager.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.university.manager.Dto.NewsTickerDTO;
import com.university.manager.models.NewsTicker;
import com.university.manager.models.Personne;

import com.university.manager.repositories.NewsTickerRepository;
import com.university.manager.repositories.PersonneRepository;

@Service
public class NewsTickerService {

	@Autowired
	private NewsTickerRepository newsTickerRepository;
	@Autowired
	private PersonneRepository personneRepository;

	public List<NewsTickerDTO> getAllTickers() {
		return newsTickerRepository.findTickers();
	}

	//@SuppressWarnings("unchecked")
	public NewsTicker ajouterNewTicker(NewsTicker newsTicker) {

		String message = newsTicker.getMessage();

		// Vérifier si le personne existe
		Personne personne = personneRepository.findById(newsTicker.getPersonneId())
				.orElseThrow(() -> new RuntimeException("Personne non trouvé !"));

		newsTicker.setMessage(message);
		newsTicker.setPersonneId(personne.getId());

		return newsTickerRepository.save(newsTicker);
	}

}
