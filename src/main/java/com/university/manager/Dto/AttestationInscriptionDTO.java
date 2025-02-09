package com.university.manager.Dto;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttestationInscriptionDTO {
    private String nom;
    private String prenom;
    private String numeroInscription;
    private Date dateInscription;
    private String programme;
    private String anneeScolaire;

}

