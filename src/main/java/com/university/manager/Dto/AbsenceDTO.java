package com.university.manager.Dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class AbsenceDTO {
    private Long id;
    private int count;
    private LocalDate date;
    private boolean justified;
    private String reason;
    private Long etudiantId;
    private String etudiantNom;
    private String etudiantPrenom;
    private String etudiantMatricule;
    private Long matiereId;
    private String matiereNom;
    private String matiereCode;
    
    // Constructeurs
    public AbsenceDTO() {}
    
    public AbsenceDTO(Long id, int count, LocalDate date, boolean justified, String reason,
                     Long etudiantId, String etudiantNom, String etudiantPrenom, String etudiantMatricule,
                     Long matiereId, String matiereNom, String matiereCode) {
        this.id = id;
        this.count = count;
        this.date = date;
        this.justified = justified;
        this.reason = reason;
        this.etudiantId = etudiantId;
        this.etudiantNom = etudiantNom;
        this.etudiantPrenom = etudiantPrenom;
        this.etudiantMatricule = etudiantMatricule;
        this.matiereId = matiereId;
        this.matiereNom = matiereNom;
        this.matiereCode = matiereCode;
    }
}
