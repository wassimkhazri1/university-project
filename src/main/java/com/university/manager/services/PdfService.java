package com.university.manager.services;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.university.manager.Dto.AttestationInscriptionDTO;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

import org.springframework.stereotype.Service;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
@Service
public class PdfService {

    public ByteArrayInputStream generateAttestationPdf(AttestationInscriptionDTO attestation) {

        Document document = new Document(PageSize.A4);
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
        	
            // Ajouter le logo de l'université (si disponible)
//            String logoPath = "C:\\university project\\back-end\\manager\\src\\main\\resources\\image\\logo.png";
//            Image img = Image.getInstance(logoPath);
//            img.scaleToFit(100, 100);
//            img.setAlignment(Element.ALIGN_CENTER);
//            document.add(img);

            PdfWriter.getInstance(document, out);
            document.open();

            Font fontHeader = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD);
            Font fontNormal = new Font(Font.FontFamily.HELVETICA, 12, Font.NORMAL);

            Paragraph title = new Paragraph("Attestation d'Inscription", fontHeader);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            document.add(new Paragraph(" "));
            document.add(new Paragraph("Nom : " + attestation.getNom(), fontNormal));
            document.add(new Paragraph("Prénom : " + attestation.getPrenom(), fontNormal));
            document.add(new Paragraph("Numéro d'inscription : " + attestation.getNumeroInscription(), fontNormal));
            document.add(new Paragraph("Date d'inscription : " + attestation.getDateInscription(), fontNormal));
            document.add(new Paragraph("Programme : " + attestation.getProgramme(), fontNormal));
            document.add(new Paragraph("Année Scolaire : " + attestation.getAnneeScolaire(), fontNormal));

            document.close();

        } catch (DocumentException ex) {
            ex.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }
}

