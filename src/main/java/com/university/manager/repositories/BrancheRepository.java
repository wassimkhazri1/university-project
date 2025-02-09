package com.university.manager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.university.manager.models.Branche;

@Repository
public interface BrancheRepository extends JpaRepository<Branche, Long> {
}
