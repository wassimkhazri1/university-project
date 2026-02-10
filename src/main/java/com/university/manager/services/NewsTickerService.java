package com.university.manager.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.university.manager.Dto.NewsTickerDTO;
import com.university.manager.repositories.NewsTickerRepository;

@Service
public class NewsTickerService {

	@Autowired
	private NewsTickerRepository newsTickerRepository;

	public List<NewsTickerDTO> getAllTickers() {
		return newsTickerRepository.findTickers();
	}

}
