package com.university.manager.repositories;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.university.manager.models.Absence;

@Repository
public interface AbsenceRepository extends JpaRepository<Absence, Long> {

}
