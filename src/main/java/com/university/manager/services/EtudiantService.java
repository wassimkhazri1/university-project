package com.university.manager.services;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.draw.LineSeparator;
import com.university.manager.Dto.EtudiantInfoDTO;
import com.university.manager.models.Branche;
import com.university.manager.models.Classe;
import com.university.manager.models.ERole;
import com.university.manager.models.Etudiant;
import com.university.manager.models.Groupe;
import com.university.manager.models.NiveauScol;
import com.university.manager.models.Personne;
import com.university.manager.models.Role;
import com.university.manager.repositories.BrancheRepository;
import com.university.manager.repositories.ClasseRepository;
import com.university.manager.repositories.EtudiantRepository;
import com.university.manager.repositories.GroupRepository;
import com.university.manager.repositories.NiveauScolRepository;
import com.university.manager.repositories.PersonneRepository;
import com.university.manager.repositories.RoleRepository;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class EtudiantService {
	@Autowired
	private EtudiantRepository etudiantRepository;

	@Autowired
	private GroupRepository groupeRepository;

	@Autowired
	private ClasseRepository classeRepository;

	@Autowired
	private NiveauScolRepository niveauScolaireRepository;

	@Autowired
	private BrancheRepository brancheRepository;

	@Autowired
	private PersonneRepository personneRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@SuppressWarnings("unchecked")
	public Etudiant ajouterEtudiant(Etudiant etudiant) {
		Optional<Role> roleOptional = Optional.of(roleRepository.findByName(ERole.ROLE_STUDENT)
				.orElseThrow(() -> new RuntimeException("Rôle non trouvé")));

		if (roleOptional.isPresent()) {
			Role role = roleOptional.get();
			etudiant.getRoles().add(role);

		}

		String nom = etudiant.getNom();
		String prenom = etudiant.getPrenom();
		String email = etudiant.getEmail();
		String cinNumber = etudiant.getCinNumber();
		String telephone = etudiant.getTelephone();
		String password = etudiant.getPassword();
		String photo = etudiant.getPhoto();
		// Set<String> role = signUpRequest.getRole();

		etudiant.setNom(nom);
		etudiant.setPrenom(prenom);
		etudiant.setCinNumber(cinNumber);
		etudiant.setEmail(email);
		etudiant.setTelephone(telephone);
		etudiant.setPassword(encoder.encode(password));
		etudiant.setPhoto(photo);

		// Vérifier si le groupe, la classe et le niveau existent
		Groupe groupe = groupeRepository.findById(etudiant.getGroupe().getId())
				.orElseThrow(() -> new RuntimeException("Groupe non trouvé !"));

		Classe classe = classeRepository.findById(etudiant.getClasse().getId())
				.orElseThrow(() -> new RuntimeException("Classe non trouvée !"));

		NiveauScol niveauScolaire = niveauScolaireRepository.findById(etudiant.getNiveauScol().getId())
				.orElseThrow(() -> new RuntimeException("Niveau scolaire non trouvé !"));

		Branche branche = brancheRepository.findById(etudiant.getBranche().getId())
				.orElseThrow(() -> new RuntimeException("Branche non trouvé !"));

		// Associer l'étudiant

		etudiant.setGroupe(groupe);
		etudiant.setClasse(classe);
		etudiant.setNiveauScol(niveauScolaire);
		etudiant.setBranche(branche);
		return etudiantRepository.save(etudiant);
	}

	public Etudiant modifierEtudiant(Long etudiantId, Etudiant etudiantDetails, Long groupeId, Long classeId,
			Long niveauId) {
		// Vérifier si l'étudiant existe
		Etudiant etudiant = etudiantRepository.findById(etudiantId)
				.orElseThrow(() -> new RuntimeException("Étudiant non trouvé !"));

		// Vérifier si le groupe, la classe et le niveau existent
		Groupe groupe = groupeRepository.findById(groupeId)
				.orElseThrow(() -> new RuntimeException("Groupe non trouvé !"));

		Classe classe = classeRepository.findById(classeId)
				.orElseThrow(() -> new RuntimeException("Classe non trouvée !"));

		NiveauScol niveauScolaire = niveauScolaireRepository.findById(niveauId)
				.orElseThrow(() -> new RuntimeException("Niveau scolaire non trouvé !"));
		if (etudiantDetails.getNom() != null) {
			etudiant.setNom(etudiant.getNom());
		}
		etudiant.setGroupe(groupe);
		etudiant.setClasse(classe);
		etudiant.setNiveauScol(niveauScolaire);

		return etudiantRepository.save(etudiant);
	}

	public Etudiant addEtudiant(Etudiant etudiant) {
		// TODO Auto-generated method stub
		return etudiantRepository.save(etudiant);
	}

	public List<EtudiantInfoDTO> getAllEtudiants() {
		// TODO Auto-generated method stub
		// return etudiantRepository.findAll();
		return etudiantRepository.findEtudiants();
	}

	public void deleteEtudiant(Long id) {
		etudiantRepository.deleteById(id);
	}

	public void exportAllEtudiantsToPdf(List<Etudiant> etudiants, HttpServletResponse response)
			throws IOException, DocumentException {
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
		PdfPTable table = new PdfPTable(4);
		table.setWidthPercentage(100);
		table.setSpacingBefore(10f);
		table.setSpacingAfter(10f);

		// Add table headers
		Stream.of("Matricule", "Full name", "Niveau scolaire", "Groupe").forEach(columnTitle -> {
			PdfPCell header = new PdfPCell();
			header.setBackgroundColor(BaseColor.LIGHT_GRAY);
			header.setBorderWidth(2);
			header.setPhrase(new Phrase(columnTitle));
			table.addCell(header);
		});

		// Add rows
		// for (Etudiant operation : getAllEtudiants()) {
		for (Etudiant operation : etudiants) {

			String niveauscol = operation.getNiveauScol().getNom();

			table.addCell(operation.getMatricule());
			table.addCell(operation.getNom() + " " + operation.getPrenom());
			// table.addCell(operation.typeNiveauScol(niveauscol));
			table.addCell(typeNiveauScol(niveauscol));
			table.addCell(String.valueOf(operation.getGroupe().getName()));

		}

		document.add(table);
		document.close();
	}

	// Méthode pour déterminer le type d'année
	public String typeNiveauScol(String niveauScol) {
		switch (niveauScol) {
		case "PREMIERE_ANNEE":
			return "1 ère année";
		case "DEUXIEME_ANNEE":
			return "2 ème année";
		case "TROISIEME_ANNE":
			return "3 ème année";

		default:
			return "";
		}
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
