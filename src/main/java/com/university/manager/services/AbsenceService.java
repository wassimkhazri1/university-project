package com.university.manager.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.university.manager.models.Absence;
import com.university.manager.repositories.AbsenceRepository;

@Service
public class AbsenceService {
	
	@Autowired
	private AbsenceRepository absenceRepository;
	
	public List<Absence> getAllAbsences(){
		return absenceRepository.findAll();
	}

	public Absence ajouterAbsence(Absence absence) {
		// TODO Auto-generated method stub
		return absenceRepository.save(absence);
	}

}
