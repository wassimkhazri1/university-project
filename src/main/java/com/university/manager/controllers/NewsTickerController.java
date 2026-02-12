package com.university.manager.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.university.manager.Dto.NewsTickerDTO;
import com.university.manager.models.Etudiant;
import com.university.manager.models.NewsTicker;
import com.university.manager.services.NewsTickerService;

@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React app
@RestController
@RequestMapping("/api/tickers")
public class NewsTickerController {
	
	@Autowired
	private NewsTickerService newsTickerService;

	
	@GetMapping
	public List<NewsTickerDTO> getAllTickers() {
		return newsTickerService.getAllTickers();
	}
	
	@PostMapping
	public NewsTicker addNewTicker(@RequestBody NewsTicker newsTicker) {
		return newsTickerService.ajouterNewTicker(newsTicker);
	}
}
