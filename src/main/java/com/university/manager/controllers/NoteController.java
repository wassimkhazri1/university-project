package com.university.manager.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itextpdf.text.DocumentException;
import com.university.manager.models.Etudiant;
import com.university.manager.models.Note;
import com.university.manager.repositories.NoteRepository;
import com.university.manager.services.NoteService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

	@Autowired
	private NoteService noteService;
	
	@Autowired
	private NoteRepository noteRepository;

	@GetMapping
	public List<Note> getAllNotes() {
		return noteService.getAllNotes();
	}

	@PostMapping
	public Note addNote(@RequestBody Note note) {
		return noteService.ajouterNote(note);
	}
	@GetMapping("/export/pdf")
	public void exportToPdf(HttpServletResponse response) throws IOException, DocumentException {
		// Récupérer tous les utilisateurs
		List<Note> notes = noteRepository.findAll();

		// Configurer la réponse HTTP pour un fichier PDF
		response.setContentType("application/pdf");
		response.setHeader("Content-Disposition", "attachment; filename=all_etudiants_operations.pdf");

		// Passer la liste des utilisateurs au service pour générer le PDF
		noteService.exportAllNotesToPdf(notes, response);
	}
	@GetMapping("/export/pdf/{etudiantId}")
	public void exportToPdf1(@PathVariable Long etudiantId,HttpServletResponse response) throws IOException, DocumentException {
		// Récupérer tous les utilisateurs
		List<Note> notes = noteRepository.getNotesByEtudiant(etudiantId);

		// Configurer la réponse HTTP pour un fichier PDF
		response.setContentType("application/pdf");
		response.setHeader("Content-Disposition", "attachment; filename=all_etudiants_operations.pdf");

		// Passer la liste des utilisateurs au service pour générer le PDF
		noteService.exportAllNotesToPdf(notes, response);
	}
	

}
