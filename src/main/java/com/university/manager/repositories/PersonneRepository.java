package com.university.manager.repositories;
import java.util.Optional;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.university.manager.models.Personne;
import com.university.manager.models.User;

@Repository
public interface PersonneRepository extends JpaRepository<Personne, Long> {

    Optional<Personne> findByPrenom(String username);

    Boolean existsByPrenom(String prenom);

    Boolean existsByEmail(String email);
	
}