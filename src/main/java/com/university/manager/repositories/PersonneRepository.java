package com.university.manager.repositories;

import java.util.Optional;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.university.manager.Dto.MoyenneDTO;
import com.university.manager.Dto.PersonneDTO;
import com.university.manager.models.Personne;

@Repository
public interface PersonneRepository extends JpaRepository<Personne, Long> {

	Optional<Personne> findByPrenom(String username);

	Boolean existsByPrenom(String prenom);

	Boolean existsByEmail(String email);

	Optional<Personne> findByEmail(String email);

	Optional<Personne> findById(Long id);

	@Query("SELECT new com.university.manager.Dto.PersonneDTO(p.id, p.nom, p.prenom, p.email, p.cinNumber, p.telephone) "
			+ "FROM Personne p WHERE p.id = :personneId")
	Optional<PersonneDTO> findPersonneByCodeId(@Param("personneId") Long personneId);

}