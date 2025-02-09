package com.university.manager.services;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.draw.LineSeparator;
import com.university.manager.models.Etudiant;
import com.university.manager.models.Note;
import com.university.manager.repositories.NoteRepository;
import com.university.manager.services.EtudiantService.HeaderFooterPageEvent;

import jakarta.servlet.http.HttpServletResponse;

@Service
public class NoteService {
	@Autowired
	private NoteRepository noteRepository;

	public List<Note> getNotesByEtudiant(Long id) {
		return noteRepository.getNotesByEtudiant(id);
	}

	public List<Note> getAllNotes() {
		return noteRepository.findAll();
	}

	public Note ajouterNote(Note note) {
		return noteRepository.save(note);
	}

	public void exportAllNotesToPdf(List<Note> notes, HttpServletResponse response)
			throws IOException, DocumentException {
		Document document = new Document(PageSize.A4.rotate());
		PdfWriter.getInstance(document, response.getOutputStream());
		document.open();

		// Font settings
		Font headerFont = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD);
		Font normalFont = new Font(Font.FontFamily.TIMES_ROMAN, 10);
		Font normalFont1 = new Font(Font.FontFamily.TIMES_ROMAN, 10);

		// Title
		Paragraph title = new Paragraph("RELEVÉ DE NOTES", new Font(Font.FontFamily.TIMES_ROMAN, 16, Font.BOLD));
		title.setAlignment(Element.ALIGN_CENTER);
		document.add(title);
		document.add(new Paragraph("\n"));

		// Table settings
		PdfPTable table = new PdfPTable(14);
		table.setWidthPercentage(100);
		table.setSpacingBefore(10f);

		// Column widths (ajusté pour inclure la nouvelle colonne)
		float[] columnWidths = { 1f, 2f, 5f, 2f, 2f, 3f, 2f, 2f, 2f, 2f, 2f, 2f, 2f,2f};
		table.setWidths(columnWidths);
		// Table headers
		addTableHeader(table, "", 1, normalFont1); // 🔥 Nouvelle colonne fusionnée
		addTableHeader(table, "Unités d’Enseignement (U.E)", 4, headerFont);
		addTableHeader(table, "Matière(s) constitutive(s) de l’unité d’enseignement", 2, headerFont);
		addTableHeader(table, "Résultats obtenus", 3, headerFont);
		addTableHeader(table, "Session", 4, headerFont);

		// Subheaders0
		String[] subHeaders = { "", "Code", "Nature", "Crédits Requis", "Coef.", "Intitulé(s)", "Crédits Requis",
				"Coef.", "Matières Note", "Crédits", "U.E Note", "Crédits Session", "Session P","Session R" };
		for (int i = 0; i < subHeaders.length; i++) {
			PdfPCell cell = new PdfPCell(new Phrase(subHeaders[i], headerFont));
			cell.setHorizontalAlignment(Element.ALIGN_CENTER);
//	        if (i == 0 || i == subHeaders.length - 1) {
//	            cell.setRotation(90);
//	        }
			table.addCell(cell);
		}

		// Ajout des données
		int rowCounter = 0;
		int totalRows = notes.size();
		for (Note note : notes) {
			// Ajouter la cellule fusionnée uniquement à la 3ème ligne pour remplacer les
			// deux premières
//	    	if (rowCounter == 3) { 
//	    	    PdfPCell mergedCell = new PdfPCell(new Phrase("Valeur fusionnée", normalFont));
//	    	    mergedCell.setRowspan(totalRows - 2); // Fusionne avec toutes les lignes sauf les 2 premières
//	    	    mergedCell.setHorizontalAlignment(Element.ALIGN_CENTER);
//	    	    mergedCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
//	    	    mergedCell.setRotation(90); // 🔥 Rotation verticale du texte
//	    	    table.addCell(mergedCell);
//	    	}

			// Ajouter une cellule fusionnée toutes les 5 lignes
			if (rowCounter % 5 == 0) {
				PdfPCell mergedCell = new PdfPCell(new Phrase("Valeur fusionnée", normalFont));
				mergedCell.setRowspan(5); // Fusionne sur 5 lignes
				mergedCell.setHorizontalAlignment(Element.ALIGN_CENTER);
				mergedCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
				mergedCell.setRotation(90); // 🔥 Rotation du texte en vertical
				table.addCell(mergedCell);
			}

//	        if (rowCounter % 5 == 0) {
//	            PdfPCell mergedCell = new PdfPCell(new Phrase("Valeur fusionnée", normalFont));
//	            mergedCell.setRowspan(5); // Fusionne sur 5 lignes
//	            mergedCell.setHorizontalAlignment(Element.ALIGN_CENTER);
//	            mergedCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
//	            table.addCell(mergedCell);
//	        }

			// Ajouter les autres colonnes normalement
			table.addCell(note.getMatiere().getCode());
			table.addCell(note.getMatiere().getNature().getNom());
			table.addCell(note.getCredits().toString());
			table.addCell(note.getCoefTd().toString());
			table.addCell(note.getMatiere().getCodeIntitule());
			table.addCell("4");
			table.addCell(note.getCoefMoyenne().toString());
			table.addCell(note.getMoyenne().toString());
			table.addCell(String.valueOf(note.getCreditsNormale()));
			table.addCell(String.valueOf(note.getNoteRattrapage()));
			table.addCell(String.valueOf(note.getCreditsRattrapage()));
			String session = "Normal";
			String session1 = "";
			String session2="";
			if(session == "Normal") {
				session1 = "Normal";
				session2 = "";
			}
			else {
				session2 = "Normal";
				session1 = "";
			}
			table.addCell(session1);
			table.addCell(session2);

			rowCounter++;
		}

		document.add(table);
		document.close();
	}

//	private void addTableHeader(PdfPTable table, String title, int colspan, Font font) {
//	    PdfPCell cell = new PdfPCell(new Phrase(title, font));
//	    cell.setColspan(colspan);
//	    cell.setHorizontalAlignment(Element.ALIGN_CENTER);
//	    cell.setBackgroundColor(BaseColor.LIGHT_GRAY);
//	    table.addCell(cell);
//	}

	public void exportAllNotesToPdf3(List<Note> notes, HttpServletResponse response)
			throws IOException, DocumentException {
		Document document = new Document(PageSize.A4.rotate());
		PdfWriter.getInstance(document, response.getOutputStream());
		document.open();

		// Font settings
		Font headerFont = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD);
		Font normalFont = new Font(Font.FontFamily.TIMES_ROMAN, 10);

		// Title
		Paragraph title = new Paragraph("RELEVE DE NOTES", new Font(Font.FontFamily.TIMES_ROMAN, 16, Font.BOLD));
		title.setAlignment(Element.ALIGN_CENTER);
		document.add(title);
		document.add(new Paragraph("\n"));

		// Table settings
		PdfPTable table = new PdfPTable(13); // Ajout de la colonne "Semestre"
		table.setWidthPercentage(100);
		table.setSpacingBefore(10f);

		// Column widths
		float[] columnWidths = { 2f, 2f, 3f, 2f, 2f, 4f, 2f, 2f, 2f, 2f, 2f, 2f, 2f };
		table.setWidths(columnWidths);

		// Table headers
		addTableHeader(table, "Semestre", 1, headerFont); // Ajout en premier
		addTableHeader(table, "Unités d’Enseignement (U.E)", 4, headerFont);
		addTableHeader(table, "Matière(s) constitutive(s) de l’unité d’enseignement", 2, headerFont);
		addTableHeader(table, "Résultats obtenus", 4, headerFont);
		addTableHeader(table, "Session", 2, headerFont);

		// Subheaders
		String[] subHeaders = { " ", "Code", "Nature", "Crédits Requis", "Coef.", "Intitulé(s)", "Crédits Requis",
				"Coef.", "Matières Note", "Crédits", "U.E Note", "Crédits Session", " " };
		for (int i = 0; i < subHeaders.length; i++) {
			PdfPCell cell = new PdfPCell(new Phrase(subHeaders[i], headerFont));
			cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			if (i == 0 || i == subHeaders.length - 1) {
				cell.setRotation(90); // Écriture verticale pour "Semestre"
			}
			table.addCell(cell);
		}

		// Ajouter les données
		String currentSemestre = "";
		int rowSpan = 0;
		PdfPCell semestreCell = null;

		for (int i = 0; i < notes.size(); i++) {
			Note note = notes.get(i);
			String semestre = (note.getMatiere().getCode().startsWith("UE1")) ? "Semestre 1" : "Semestre 2";

			// Fusionner la colonne "Semestre"
			if (!semestre.equals(currentSemestre)) {
				if (semestreCell != null) {
					semestreCell.setRowspan(rowSpan);
					table.addCell(semestreCell);
				}
				currentSemestre = semestre;
				semestreCell = new PdfPCell(new Phrase(currentSemestre, normalFont));
				semestreCell.setHorizontalAlignment(Element.ALIGN_CENTER);
				semestreCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
				semestreCell.setRotation(90); // Écriture verticale
				rowSpan = 1;
			} else {
				rowSpan++;
			}

			table.addCell(note.getMatiere().getCode());
			table.addCell(note.getMatiere().getNature().getNom());
			table.addCell(note.getCredits().toString());
			table.addCell(note.getCoefTd().toString());
			table.addCell(note.getMatiere().getCodeIntitule());
			table.addCell("4");
			table.addCell(note.getCoefMoyenne().toString());
			table.addCell(note.getMoyenne().toString());
			table.addCell("Normal");
			table.addCell(String.valueOf(note.getCreditsNormale()));
			table.addCell(String.valueOf(note.getNoteRattrapage()));
			table.addCell(String.valueOf(note.getCreditsRattrapage()));

			// Ajouter la dernière cellule fusionnée à la fin
			if (i == notes.size() - 1 && semestreCell != null) {
				semestreCell.setRowspan(rowSpan);
				table.addCell(semestreCell);
			}
		}

		document.add(table);
		document.close();
	}

//	private void addTableHeader(PdfPTable table, String title, int colspan, Font font) {
//	    PdfPCell cell = new PdfPCell(new Phrase(title, font));
//	    cell.setColspan(colspan);
//	    cell.setHorizontalAlignment(Element.ALIGN_CENTER);
//	    cell.setBackgroundColor(BaseColor.LIGHT_GRAY);
//	    table.addCell(cell);
//	}

	public void exportAllNotesToPdf2(List<Note> notes, HttpServletResponse response)
			throws IOException, DocumentException {
		Document document = new Document(PageSize.A4.rotate());
		PdfWriter.getInstance(document, response.getOutputStream());
		document.open();

		// Font settings
		Font headerFont = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD);
		Font normalFont = new Font(Font.FontFamily.TIMES_ROMAN, 10);

		// Title
		Paragraph title = new Paragraph("RELEVE DE NOTES", new Font(Font.FontFamily.TIMES_ROMAN, 16, Font.BOLD));
		title.setAlignment(Element.ALIGN_CENTER);
		document.add(title);
		document.add(new Paragraph("\n"));

		// Table settings
		PdfPTable table = new PdfPTable(13);
		table.setWidthPercentage(100);
		table.setSpacingBefore(10f);

		// Column widths
		float[] columnWidths = { 2f, 3f, 2f, 2f, 4f, 2f, 2f, 2f, 2f, 2f, 2f, 2f, 2f };
		table.setWidths(columnWidths);

		// Table headers
		addTableHeader(table, "Unités d’Enseignement (U.E)", 4, headerFont);
		addTableHeader(table, "Matière(s) constitutive(s) de l’unité d’enseignement", 2, headerFont);
		addTableHeader(table, "Résultats obtenus", 4, headerFont);
		addTableHeader(table, "Semestre", 2, headerFont);

		// Subheaders
		String[] subHeaders = { "Code", "Nature", "Crédits Requis", "Coef.", "Intitulé(s)", "Crédits Requis", "Coef.",
				"Matières Note", "Crédits", "Session", "U.E Note", "Crédits Session", "Semestre" };
		for (String subHeader : subHeaders) {
			PdfPCell cell = new PdfPCell(new Phrase(subHeader, headerFont));
			cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table.addCell(cell);
		}

		// Adding rows with sample data
//		String[][] sampleData = {
//				{ "U.E.F", "Fondamentale", "6", "3", "Mathématiques", "6", "3", "15", "6", "Normal", "15", "6" },
//				{ "U.E.D", "Découverte", "3", "2", "Physique", "3", "2", "14", "3", "Normal", "14", "3" },
//				{ "U.E.T", "Transversale", "2", "1", "Informatique", "2", "1", "16", "2", "Normal", "16", "2" } };

		for (Note note : notes) {

			table.addCell(note.getMatiere().getCode());
			table.addCell(note.getMatiere().getNature().getNom());
			table.addCell(note.getCredits().toString());
			// table.addCell(note.getNoteTd().toString());
			table.addCell(note.getCoefTd().toString());

			table.addCell(note.getMatiere().getCodeIntitule());
			table.addCell("4");
			table.addCell(note.getCoefMoyenne().toString());
			table.addCell(note.getMoyenne().toString());
			table.addCell("Normal");
			table.addCell(String.valueOf(note.getCreditsNormale()));
			table.addCell(String.valueOf(note.getNoteRattrapage()));
			table.addCell(String.valueOf(note.getCreditsRattrapage()));
//			table.addCell(String.valueOf(note.getNoteNormale()));
//			table.addCell(String.valueOf(note.getCreditsNormale()));
//			table.addCell(String.valueOf(note.getNoteRattrapage()));
//			table.addCell(String.valueOf(note.getCreditsRattrapage()));
			String semestre = (note.getMatiere().getCode().startsWith("UE1")) ? "Semestre 1" : "Semestre 2";
			table.addCell(semestre);
		}

		document.add(table);
		document.close();
	}

	private void addTableHeader(PdfPTable table, String title, int colspan, Font font) {
		PdfPCell cell = new PdfPCell(new Phrase(title, font));
		cell.setColspan(colspan);
		cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		cell.setBackgroundColor(BaseColor.LIGHT_GRAY);
		table.addCell(cell);
	}

	public void exportAllNotesToPdf1(List<Note> notes, HttpServletResponse response)
			throws IOException, DocumentException {
		response.setContentType("application/pdf");
		response.setHeader("Content-Disposition", "attachment; filename=releve_notes.pdf");

		Document document = new Document(PageSize.A4);
		PdfWriter.getInstance(document, response.getOutputStream());

		document.open();

		// Ajouter l'en-tête
		Font titleFont = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.BOLD);
		Font subtitleFont = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD);
		Font textFont = new Font(Font.FontFamily.TIMES_ROMAN, 10);

		Paragraph header = new Paragraph("REPUBLIQUE ALGERIENNE DEMOCRATIQUE ET POPULAIRE", titleFont);
		header.setAlignment(Element.ALIGN_CENTER);
		document.add(header);
		document.add(new Paragraph("MINISTERE DE L'ENSEIGNEMENT SUPERIEUR ET DE LA RECHERCHE SCIENTIFIQUE", titleFont));
		document.add(new Paragraph("\n"));

		document.add(new Paragraph("Etablissement : .....................................................", textFont));
		document.add(new Paragraph("Faculté / Institut : .................................................", textFont));
		document.add(new Paragraph("Département : ....................................................", textFont));
		document.add(new Paragraph("\n"));

		Paragraph title = new Paragraph("RELEVE DE NOTES", subtitleFont);
		title.setAlignment(Element.ALIGN_CENTER);
		document.add(title);
		document.add(new Paragraph("\n"));

		// Ajouter les informations de l'étudiant
		document.add(new Paragraph("Année Universitaire : ..............................................", textFont));
		document.add(new Paragraph(
				"Nom : .................................. Prénom : ........................................",
				textFont));
		document.add(
				new Paragraph("N° d'inscription : ....................................................", textFont));
		document.add(new Paragraph("Date et lieu de naissance : ........................................", textFont));
		document.add(new Paragraph(
				"Domaine : .......................... Filière : .......................... Spécialité : ..................",
				textFont));
		document.add(new Paragraph("Mention : .........................................................", textFont));
		document.add(new Paragraph("Diplôme préparé : Licence", textFont));
		document.add(new Paragraph("\n"));

		// Ajouter le tableau des notes
		PdfPTable table = new PdfPTable(12);
		table.setWidthPercentage(100);
		table.setSpacingBefore(10f);

		String[] headers = { "Nature", "Code & Intitulé", "Crédits", "Coef.", "Intitulé(s)", "Crédits", "Coef.",
				"Session Normale Note", "Session Normale Crédits", "Session Rattrapage Note",
				"Session Rattrapage Crédits" };
		for (String headerText : headers) {
			PdfPCell cell = new PdfPCell(new Phrase(headerText, subtitleFont));
			cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			table.addCell(cell);
		}

		// Remplir le tableau avec les notes
//	        for (Note note : notes) {
//	            table.addCell(note.getNature());
//	            table.addCell(note.getCodeIntitule());
//	            table.addCell(String.valueOf(note.getCredits()));
//	            table.addCell(String.valueOf(note.getCoefficient()));
//	            table.addCell(note.getIntituleMatiere());
//	            table.addCell(String.valueOf(note.getCreditsMatiere()));
//	            table.addCell(String.valueOf(note.getCoefficientMatiere()));
//	            table.addCell(String.valueOf(note.getNoteNormale()));
//	            table.addCell(String.valueOf(note.getCreditsNormale()));
//	            table.addCell(String.valueOf(note.getNoteRattrapage()));
//	            table.addCell(String.valueOf(note.getCreditsRattrapage()));
//	        }

		for (Note note : notes) {
			table.addCell(note.getNoteTd().toString());
			table.addCell(note.getCoefTd().toString());
			table.addCell(note.getNoteExamen().toString());
			table.addCell(note.getCoefExamen().toString());
			table.addCell(note.getMoyenne().toString());
			table.addCell(note.getCoefMoyenne().toString());
			table.addCell(note.getMatiere().getCodeIntitule());
//	            table.addCell(String.valueOf(note.getCredits()));
//	            table.addCell(String.valueOf(note.getCoefficient()));
//	            table.addCell(note.getIntituleMatiere());
//	            table.addCell(String.valueOf(note.getCreditsMatiere()));
//	            table.addCell(String.valueOf(note.getCoefficientMatiere()));
			table.addCell(String.valueOf(note.getNoteNormale()));
			table.addCell(String.valueOf(note.getCreditsNormale()));
			table.addCell(String.valueOf(note.getNoteRattrapage()));
			table.addCell(String.valueOf(note.getCreditsRattrapage()));
		}

		document.add(table);

		document.add(new Paragraph(
				"\nMoyenne du semestre S1 : ............... Crédits obtenus au cours du semestre S1 : ...............",
				textFont));
		document.add(new Paragraph(
				"Moyenne du semestre S2 : ............... Crédits obtenus au cours du semestre S2 : ...............",
				textFont));
		document.add(new Paragraph(
				"Moyenne annuelle : ............... Total des crédits cumulés pour l'année (S1 + S2) : ...............",
				textFont));
		document.add(new Paragraph("\nUnité d'Enseignements Capitalisées : ........................................",
				textFont));

		document.add(new Paragraph("\nLe Chef de Département : Griffe, cachet rond, signature et date", subtitleFont));

		document.close();
	}

}
