package com.university.manager.repositories;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.university.manager.models.Group;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {

	@Query(value = "SELECT * FROM ggroupes WHERE id = :codeId", nativeQuery = true)
	Optional<Group> findByCodeId(@Param("codeId") Long id);
}
