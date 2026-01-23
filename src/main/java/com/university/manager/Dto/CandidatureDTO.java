package com.university.manager.Dto;

import java.util.Date;

import lombok.Data;

@Data
public class CandidatureDTO {

	private Long id;
	private String cvPath;
	private String lettreMotivationPath;
	private Date createdAt;
	private Date updatedAt;
	private Long jobOfferId;

	public CandidatureDTO() {
		super();
	}

	public CandidatureDTO(Long id, String cvPath, String lettreMotivationPath, Date createdAt, Date updatedAt,
			Long jobOfferId) {
		super();
		this.id = id;
		this.cvPath = cvPath;
		this.lettreMotivationPath = lettreMotivationPath;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.jobOfferId = jobOfferId;
	}

}
