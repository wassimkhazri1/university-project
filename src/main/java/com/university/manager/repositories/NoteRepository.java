package com.university.manager.repositories;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.university.manager.models.Etudiant;
import com.university.manager.models.Matiere;
import com.university.manager.models.Note;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

	// recuoérer les etudiants par niveau scolaire et class et groupe
	@Query("SELECT n FROM Note n JOIN n.matiere m WHERE n.etudiant.id = :etudiantId")
	List<Note> getNotesByEtudiant(@Param("etudiantId") Long etudiantId);
	
	//recupérer les notes par etudiants et par semestre
	@Query("SELECT n FROM Note n JOIN n.matiere m JOIN m.semestre s WHERE n.etudiant.id = :etudiantId AND s.id = :semestreId")
	List<Note> getNotesByEtudiantBySemestre(@Param("etudiantId") Long etudiantId,@Param("semestreId") Long semestreId);
	// recupérer les notes par etudiants scolaire et class et groupe
	@Query("SELECT n FROM Note n WHERE n.etudiant.id = :etudiantId AND n.matiere.code = :matiereCode")
	List<Note> findNotesByEtudiantMatiere(@Param("etudiantId") Long etudiantId, @Param("matiereCode") Long matiereCode);

	boolean existsByEtudiantAndMatiere(Etudiant etudiant, Matiere matiere);

}
