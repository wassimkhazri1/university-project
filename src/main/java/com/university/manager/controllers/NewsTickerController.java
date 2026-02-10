package com.university.manager.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.university.manager.Dto.NewsTickerDTO;
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
}
