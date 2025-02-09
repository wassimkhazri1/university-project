package com.university.manager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.university.manager.models.Personne;

@Repository
public interface PersonneRepository extends JpaRepository<Personne, Long> {

}