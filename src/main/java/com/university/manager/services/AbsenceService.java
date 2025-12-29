package com.university.manager.services;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.university.manager.models.Absence;
import com.university.manager.repositories.AbsenceRepository;

@Service
public class AbsenceService {

	@Autowired
	private AbsenceRepository absenceRepository;

	public List<Absence> getAllAbsences() {
		return absenceRepository.findAll();
	}

//	public Absence ajouterAbsence(Absence absence) {
//		// TODO Auto-generated method stub
//		return absenceRepository.save(absence);
//	}

	public Absence addAbsence(Absence absence) {
		return absenceRepository.save(absence);
	}

	public List<Absence> getAbsencesByStudent(Long studentId) {
		return absenceRepository.findByEtudiantId(studentId);
	}

	public List<Absence> getAbsencesByStudentByMatiere(Long studentId, Long matiereId) {
		// TODO Auto-generated method stub
		return absenceRepository.findByEtudiantIdByMatiereId(studentId,matiereId);
	}

}
