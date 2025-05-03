package com.university.manager.repositories;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.university.manager.Dto.EtudiantInfoDTO;
import com.university.manager.models.Branche;
import com.university.manager.models.Classe;
import com.university.manager.models.Etudiant;
import com.university.manager.models.Groupe;
import com.university.manager.models.NiveauScol;

@Repository
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {

	
	// recupérer les etudiants par niveau scolaire et class et groupe
	@Query("SELECT e FROM Etudiant e WHERE e.groupe.id = :groupeId AND e.classe.id = :classeId AND e.niveauScol.id = :niveauId")
	List<Etudiant> findEtudiantsByGroupeClasseNiveau(@Param("niveauId") Long niveauId, @Param("classeId") Long classeId,
			@Param("groupeId") Long groupeId);

	// recupérer l'etudiants par id
	@Query(value = "SELECT e FROM Etudiant e WHERE e.id = :codeId", nativeQuery = true)
	Etudiant findByCodeId(@Param("codeId") Long id);
	
	// recupérer les etudiants par niveau scolaire
	@Query("SELECT e FROM Etudiant e WHERE e.niveauScol.id = :niveauId")
	List<Etudiant> findEtudiantsByNiveau(@Param("niveauId") Long niveauId);
	
	// recupérer les etudiants
//	@Query("SELECT e FROM Etudiant e")
//	List<Etudiant> findEtudiants();

	@Query("SELECT NEW com.university.manager.Dto.EtudiantInfoDTO(e.id, e.nom, e.prenom, e.email, e.cinNumber, e.telephone, e.matricule, e.groupe, e.classe, e.niveauScol, e.branche) FROM Etudiant e")
	List<EtudiantInfoDTO> findEtudiants();
	
	// recupérer les etudiants par niveau scolaire et class
	@Query("SELECT e FROM Etudiant e WHERE e.classe.id = :classeId AND e.niveauScol.id = :niveauId")
	List<Etudiant> findEtudiantsByClasseNiveau(@Param("niveauId") Long niveauId, @Param("classeId") Long classeId);
	
	// recuoérer id etudiant par id personne
//	@Query("SELECT id FROM Etudiant e WHERE e.personne.id = :personneId")
//	Long findEtudiantIdByPersonneId(@Param("personneId") Long personneId);
	

}
