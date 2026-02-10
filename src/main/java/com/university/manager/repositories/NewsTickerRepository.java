package com.university.manager.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import com.university.manager.Dto.NewsTickerDTO;
import com.university.manager.models.NewsTicker;
@Repository
public interface NewsTickerRepository extends JpaRepository<NewsTicker, Long>{

	
	@Query("SELECT NEW com.university.manager.Dto.NewsTickerDTO(n.id, n.message,n.personneId) FROM NewsTicker n")
	List<NewsTickerDTO> findTickers();
}
