package com.university.manager.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.university.manager.Dto.EntrepriseInfoDTO;
import com.university.manager.models.Entreprise;


@Repository
public interface EntrepriseRepository extends JpaRepository<Entreprise, Long>{
	
	// recupérer les etudiants
	@Query("SELECT e FROM Entreprise e")
	List<Entreprise> findEntreprises();

//	@Query("SELECT NEW com.university.manager.Dto.EntrepriseInfoDTO(e.id, e.nom, e.prenom, e.email, e.cinNumber, e.telephone, e.matricule, e.nomcompany, e.owner, e.rhresponsible, e.adresse, e.fax, e.web, e.linkedin) FROM Entreprise e")
//	List<EntrepriseInfoDTO> findEntreprises();
	

	
}
