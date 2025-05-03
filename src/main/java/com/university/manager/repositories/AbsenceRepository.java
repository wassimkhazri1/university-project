package com.university.manager.repositories;
import java.util.List;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.university.manager.models.Absence;

@Repository
public interface AbsenceRepository extends JpaRepository<Absence, Long> {

	List<Absence> findByEtudiantId(Long studentId);
}
