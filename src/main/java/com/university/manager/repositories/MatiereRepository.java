package com.university.manager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.university.manager.models.Matiere;


@Repository
public interface MatiereRepository extends JpaRepository<Matiere, Long> {
}
