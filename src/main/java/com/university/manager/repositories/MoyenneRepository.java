package com.university.manager.repositories;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.university.manager.Dto.MoyenneDTO;
import com.university.manager.models.Moyenne;

@Repository
public interface MoyenneRepository extends JpaRepository<Moyenne, Long> {

	@Query("SELECT m.etudiant.id FROM Moyenne m WHERE m.etudiant.id = :codeid")
	Optional<Long> findEtuById(@Param("codeid") Long codeid);

	@Query("select m from Moyenne m where m.etudiant.id = :etudiantId")
	Optional<Moyenne> findByEtudiantId(@Param("etudiantId") Long etudiantId);
	
	@Query("SELECT new com.university.manager.Dto.MoyenneDTO(m.id, m.moy) " +
	           "FROM Moyenne m WHERE m.etudiant.id = :etudiantId")
	Optional<MoyenneDTO> findMoyennesByEtudiantId(@Param("etudiantId") Long etudiantId);

}
