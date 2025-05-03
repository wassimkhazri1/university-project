package com.university.manager.Dto;

import com.university.manager.models.Nature;
import com.university.manager.models.Semestre;

import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MatiereDTO {

	private Long id;

	private String nom;

	private String codeIntitule;

	private Long semestreId;
	private Long natureId;

	private String semestreNom;
	private String natureNom;
}
