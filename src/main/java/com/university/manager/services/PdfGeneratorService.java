//package com.university.manager.services;
//
//
//
//import com.itextpdf.text.*;
//import com.itextpdf.text.pdf.PdfPCell;
//import com.itextpdf.text.pdf.PdfPTable;
//import com.itextpdf.text.pdf.PdfWriter;
//import com.university.manager.payload.AttestationRequest;
//import org.springframework.stereotype.Service;
//
//import java.io.ByteArrayInputStream;
//import java.io.ByteArrayOutputStream;
//
//@Service
//public class PdfGeneratorService {
//
//    public ByteArrayInputStream generateAttestationPdf(AttestationRequest request) {
//        Document document = new Document();
//        ByteArrayOutputStream out = new ByteArrayOutputStream();
//
//        try {
//            PdfWriter.getInstance(document, out);
//            document.open();
//
//            // Ajouter le logo de l'université (si disponible)
//            String logoPath = "C:\\university project\\back-end\\manager\\src\\main\\resources\\image\\logo.png";
//            Image img = Image.getInstance(logoPath);
//            img.scaleToFit(100, 100);
//            img.setAlignment(Element.ALIGN_CENTER);
//            document.add(img);
//
//            // Ajouter le titre
//            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20);
//            Paragraph title = new Paragraph("Attestation d'Inscription", titleFont);
//            title.setAlignment(Element.ALIGN_CENTER);
//            document.add(title);
//
//            document.add(Chunk.NEWLINE);
//
//            // Ajouter les détails de l'étudiant
//            PdfPTable table = new PdfPTable(2);
//            table.setWidthPercentage(100);
//
//            addTableHeader(table, "Nom");
//            addTableCell(table, request.getLastName());
//
//            addTableHeader(table, "Prénom");
//            addTableCell(table, request.getFirstName());
//
//            addTableHeader(table, "Email");
//            addTableCell(table, request.getEmail());
//
//            addTableHeader(table, "CIN");
//            addTableCell(table, request.getCinNumber());
//
//            addTableHeader(table, "Matricule");
//            addTableCell(table, request.getMatricule());
//
//            addTableHeader(table, "Niveau Scolaire");
//            addTableCell(table, request.getNiveauScolaire());
//
//            addTableHeader(table, "Groupe");
//            addTableCell(table, request.getGroupe());
//
//            document.add(table);
//
//            // Ajouter un pied de page ou des informations supplémentaires
//            Font footerFont = FontFactory.getFont(FontFactory.HELVETICA, 12);
//            Paragraph footer = new Paragraph("Université de ...\nCe document est délivré en tant qu'attestation officielle.", footerFont);
//            footer.setAlignment(Element.ALIGN_CENTER);
//            document.add(footer);
//
//            document.close();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        return new ByteArrayInputStream(out.toByteArray());
//    }
//
//    private void addTableHeader(PdfPTable table, String headerTitle) {
//        Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
//        PdfPCell hcell = new PdfPCell(new Phrase(headerTitle, headFont));
//        hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
//        table.addCell(hcell);
//    }
//
//    private void addTableCell(PdfPTable table, String content) {
//        PdfPCell cell = new PdfPCell(new Phrase(content));
//        cell.setPaddingLeft(5);
//        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
//        cell.setHorizontalAlignment(Element.ALIGN_LEFT);
//        table.addCell(cell);
//    }
//}


package com.university.manager.services;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import com.university.manager.payload.AttestationRequest;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

@Service
public class PdfGeneratorService {

    public ByteArrayInputStream generateAttestationPdf(AttestationRequest request) {
        Document document = new Document(PageSize.A4);
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            // Ajouter le logo de l'université (si disponible)
            String logoPath = "D:\\university project\\back-end\\manager\\src\\main\\resources\\image\\logo1.png";
            Image img = Image.getInstance(logoPath);
            img.scaleToFit(100, 100);
            img.setAlignment(Element.ALIGN_RIGHT);
            document.add(img);

            // Ajouter le titre
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 24, BaseColor.BLACK);
            Paragraph title = new Paragraph("Attestation d'Inscription", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            document.add(Chunk.NEWLINE);

            // Ajouter une introduction
            Font introFont = FontFactory.getFont(FontFactory.HELVETICA, 14, BaseColor.BLACK);
            Paragraph intro = new Paragraph("Nous, soussigné, certifions par la présente que :", introFont);
            intro.setAlignment(Element.ALIGN_LEFT);
            document.add(intro);

            document.add(Chunk.NEWLINE);

            // Ajouter les détails de l'étudiant
            Font contentFont = FontFactory.getFont(FontFactory.HELVETICA, 12, BaseColor.BLACK);

            Paragraph details = new Paragraph();
            details.add(new Phrase("Nom : ", contentFont));
            details.add(new Phrase(request.getLastName(), contentFont));
            details.add(Chunk.NEWLINE);

            details.add(new Phrase("Prénom : ", contentFont));
            details.add(new Phrase(request.getFirstName(), contentFont));
            details.add(Chunk.NEWLINE);

            details.add(new Phrase("Email : ", contentFont));
            details.add(new Phrase(request.getEmail(), contentFont));
            details.add(Chunk.NEWLINE);

            details.add(new Phrase("CIN : ", contentFont));
            details.add(new Phrase(request.getCinNumber(), contentFont));
            details.add(Chunk.NEWLINE);

            details.add(new Phrase("Matricule : ", contentFont));
            details.add(new Phrase(request.getMatricule(), contentFont));
            details.add(Chunk.NEWLINE);

            details.add(new Phrase("Niveau Scolaire : ", contentFont));
            details.add(new Phrase(request.getNiveauScolaire(), contentFont));
            details.add(Chunk.NEWLINE);

            details.add(new Phrase("Groupe : ", contentFont));
            details.add(new Phrase(request.getGroupe(), contentFont));

            document.add(details);

            document.add(Chunk.NEWLINE);

            // Ajouter une déclaration de validation
            Font declarationFont = FontFactory.getFont(FontFactory.HELVETICA, 12, BaseColor.BLACK);
            Paragraph declaration = new Paragraph("Cette attestation est délivrée à titre d'information pour toute utilisation utile.", declarationFont);
            declaration.setAlignment(Element.ALIGN_LEFT);
            document.add(declaration);
            
            // Ajouter le logo de l'université (si disponible)
            String logoPath1 = "D:\\university project\\back-end\\manager\\src\\main\\resources\\image\\logo3.png";
            Image img1 = Image.getInstance(logoPath1);
            img1.scaleToFit(100, 100);
            img1.setAlignment(Element.ALIGN_RIGHT);
            document.add(img1);

//            document.add(Chunk.NEWLINE);
//
//            // Ajouter la date et la signature
//            Font footerFont = FontFactory.getFont(FontFactory.HELVETICA, 12, BaseColor.BLACK);
//            Paragraph footer = new Paragraph("Fait à [Ville], le [Date]\n\nSignature", footerFont);
//            footer.setAlignment(Element.ALIGN_RIGHT);
//            document.add(footer);
            
            document.add(Chunk.NEWLINE);
            
            // Ajouter la phrase de pied de page avec les crédits
            Font creditsFont = FontFactory.getFont(FontFactory.HELVETICA_OBLIQUE, 10, BaseColor.GRAY);
            Paragraph credits = new Paragraph("Développé par Wassim Khazri", creditsFont);
            credits.setAlignment(Element.ALIGN_CENTER);
            document.add(credits);

            document.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }
}

