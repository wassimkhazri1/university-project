package com.university.manager.services;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import com.itextpdf.text.pdf.draw.LineSeparator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;
import com.university.manager.models.User;
import com.university.manager.repositories.UserRepository;

import jakarta.servlet.http.HttpServletResponse;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
@Service
@Transactional
public class UserServiceImpl implements UserService{

	@Autowired
	UserRepository userRepository;

	@Override
	public List<User> listUsers() {
		return userRepository.findAllUsers();
	}

	@Override
	public Optional<User> findById(Long id) {
		return userRepository.findById(id);
	}

	@Override
	public User save(User user) {
		return userRepository.save(user);
	}

	@Override
	public void deleteById(Long id) {
		userRepository.deleteById(id);
	}

	@Override
	public List<User> findByMatriculeContaining(String matricule) {
		return userRepository.findByMatriculeContaining(matricule);
	}
	
	@Override
	public Optional<User> findUserById(Long id) {
		return userRepository.findById(id);
	}
	
	public void exportUserToPdf(Optional<User> user, HttpServletResponse response)
			throws IOException, DocumentException {
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, response.getOutputStream());

		// Add header and footer
		HeaderFooterPageEvent event = new HeaderFooterPageEvent();
		writer.setPageEvent(event);

		document.open();

		// Add title
		Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
		Paragraph title = new Paragraph("Liste des Etudiants", titleFont);
		title.setAlignment(Element.ALIGN_CENTER);
		document.add(title);

		// Add generation date
		Font dateFont = FontFactory.getFont(FontFactory.HELVETICA, 12);
		Paragraph date = new Paragraph("Date de génération: " + new Date().toString(), dateFont);
		date.setAlignment(Element.ALIGN_RIGHT);
		document.add(date);

		// Add a line separator
		LineSeparator ls = new LineSeparator();
		ls.setLineColor(BaseColor.BLACK);
		document.add(new Chunk(ls));

		// Create table with 5 columns
		PdfPTable table = new PdfPTable(5);
		table.setWidthPercentage(100);
		table.setSpacingBefore(10f);
		table.setSpacingAfter(10f);

		// Add table headers
		Stream.of("Matricule", "First name","Last name", "Niveau scolaire", "Groupe").forEach(columnTitle -> {
			PdfPCell header = new PdfPCell();
			header.setBackgroundColor(BaseColor.LIGHT_GRAY);
			header.setBorderWidth(2);
			header.setPhrase(new Phrase(columnTitle));
			table.addCell(header);
		});

		// Add rows
		for (User operation : listUsers()) {
			table.addCell(operation.getMatricule());
			table.addCell(operation.getFirstName());
			table.addCell(String.valueOf(operation.getLastName()));
			table.addCell(String.valueOf(operation.getNiveauScolaire()));
			//table.addCell(operation.getGroupe());
			table.addCell(String.valueOf(operation.getGroupe().getName()));

		}

		document.add(table);
		document.close();
	}




	public void exportAllUsersToPdf(List<User> users, HttpServletResponse response) throws IOException, DocumentException {
	    // Créer le document PDF et le writer pour l'écriture
	    Document document = new Document();
	    PdfWriter writer = PdfWriter.getInstance(document, response.getOutputStream());

		// Add header and footer
		HeaderFooterPageEvent event = new HeaderFooterPageEvent();
		writer.setPageEvent(event);

		document.open();

		// Add title
		Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
		Paragraph title = new Paragraph("Liste des Etudiants", titleFont);
		title.setAlignment(Element.ALIGN_CENTER);
		document.add(title);

		// Add generation date
		Font dateFont = FontFactory.getFont(FontFactory.HELVETICA, 12);
		Paragraph date = new Paragraph("Date de génération: " + new Date().toString(), dateFont);
		date.setAlignment(Element.ALIGN_RIGHT);
		document.add(date);

		// Add a line separator
		LineSeparator ls = new LineSeparator();
		ls.setLineColor(BaseColor.BLACK);
		document.add(new Chunk(ls));

		// Create table with 5 columns
		PdfPTable table = new PdfPTable(5);
		table.setWidthPercentage(100);
		table.setSpacingBefore(10f);
		table.setSpacingAfter(10f);

		// Add table headers
		Stream.of("Matricule", "First name","Last name", "Niveau scolaire", "Groupe").forEach(columnTitle -> {
			PdfPCell header = new PdfPCell();
			header.setBackgroundColor(BaseColor.LIGHT_GRAY);
			header.setBorderWidth(2);
			header.setPhrase(new Phrase(columnTitle));
			table.addCell(header);
		});
	    
		// Add rows
		for (User operation : listUsers()) {
			table.addCell(operation.getMatricule());
			table.addCell(operation.getFirstName());
			table.addCell(String.valueOf(operation.getLastName()));
			table.addCell(String.valueOf(operation.getNiveauScolaire()));
			//table.addCell(operation.getGroupe());
			table.addCell(String.valueOf(operation.getGroupe().getName()));

		}

		document.add(table);
		document.close();
	}

	
	class HeaderFooterPageEvent extends PdfPageEventHelper {
		Font footerFont = FontFactory.getFont(FontFactory.HELVETICA, 10);

		@Override
		public void onEndPage(PdfWriter writer, Document document) {
			// Police pour le footer
			Font footerFont = new Font(Font.FontFamily.HELVETICA, 10, Font.NORMAL, BaseColor.GRAY);

			// Création de la phrase pour le footer
			Phrase footer = new Phrase("Developed by Wassim Khazri | Page " + document.getPageNumber(), footerFont);

			// Ajout du texte au centre en bas de la page
			ColumnText.showTextAligned(writer.getDirectContent(), Element.ALIGN_CENTER, footer,
					(document.right() - document.left()) / 2 + document.leftMargin(), document.bottom() - 10, 0);
		}

	}
	

}