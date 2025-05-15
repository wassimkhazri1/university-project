package com.university.manager.Dto;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import com.university.manager.models.Branche;
import com.university.manager.models.Classe;
import com.university.manager.models.Groupe;
import com.university.manager.models.NiveauScol;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EtudiantInfoDTO {
	private Long id;
	private String nom;
	private String prenom;
	private String email;
	private String cinNumber;
	private String telephone;
	private String matricule;
	private Groupe groupe;
	private Classe classe;
	private NiveauScol niveauScol;
	private Branche branche;
	// Constructeur
	public EtudiantInfoDTO(Long id, String nom, String prenom, String email, String cinNumber, String telephone,
			String matricule, Groupe groupe, Classe classe, NiveauScol niveauScol, Branche branche) {
		super();
		this.id = id;
		this.nom = nom;
		this.prenom = prenom;
		this.email = email;
		this.cinNumber = cinNumber;
		this.telephone = telephone;
		this.matricule = matricule;
		this.groupe = groupe;
		this.classe = classe;
		this.niveauScol = niveauScol;
		this.branche = branche;
	}



}
