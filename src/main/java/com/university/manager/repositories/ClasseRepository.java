package com.university.manager.repositories;
import java.util.List;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.university.manager.models.Classe;

@Repository
public interface ClasseRepository extends JpaRepository<Classe, Long> {

	@Query("SELECT * from professeur_classe where professeur_id = :professeur")
	List<Classe> findClassesByProfesseurId(@Param("professeurId") Long professeurId);
}
