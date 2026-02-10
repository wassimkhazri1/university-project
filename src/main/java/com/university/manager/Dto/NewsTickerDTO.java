package com.university.manager.Dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class NewsTickerDTO {

    private Long id;
    private String message;
    private Long personneId;
	public NewsTickerDTO(Long id, String message, Long personneId) {
		super();
		this.id = id;
		this.message = message;
		this.personneId = personneId;
	}
	public NewsTickerDTO() {
		super();
	}
    
}
