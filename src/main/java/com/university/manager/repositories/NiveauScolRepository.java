package com.university.manager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.university.manager.models.NiveauScol;

@Repository
public interface NiveauScolRepository extends JpaRepository<NiveauScol, Long> {
}