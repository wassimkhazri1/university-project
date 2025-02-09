package com.university.manager.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.university.manager.models.Absence;
import com.university.manager.models.Etudiant;

@Repository
public interface AbsenceRepository extends JpaRepository<Absence, Long> {

}
