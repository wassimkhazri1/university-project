package com.university.manager.repositories;
import java.util.List;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.university.manager.models.Absence;
import com.university.manager.models.Etudiant;

@Repository
public interface AbsenceRepository extends JpaRepository<Absence, Long> {

	List<Absence> findByEtudiantId(Long studentId);
	
	// recupérer les absences par etudiant et matiere
	@Query("SELECT a FROM Absence a WHERE a.etudiant.id = :studentId AND a.matiere.id = :matiereId")
	List<Absence> findByEtudiantIdByMatiereId(@Param("studentId") Long studentId, @Param("matiereId") Long matiereId);
}
