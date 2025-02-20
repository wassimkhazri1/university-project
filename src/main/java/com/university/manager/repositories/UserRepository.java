package com.university.manager.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.university.manager.models.User;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	List<User> findByMatriculeContaining(String matricule);
	
	@Query(value = "SELECT * FROM Users", nativeQuery = true)
	List<User> findAllUsers(); 
	
    @Query(value = "SELECT * FROM Users WHERE id = :codeId", nativeQuery = true)
    Optional<User> findByCodeId(@Param("codeId") Long id);
	
}
