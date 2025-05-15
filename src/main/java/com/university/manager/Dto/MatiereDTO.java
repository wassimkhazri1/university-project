package com.university.manager.Dto;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

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
