package com.university.manager.Dto;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NoteDTO {
    private Long id;
    private Double noteTd;
    private Double coefTd;
    private Double noteExamen;
    private Double coefExamen;
    private Double moyenne;
    private Double credits;
    private Double noteNormale;
    private Double noteRattrapage;
    private Double creditsNormale;
    private Double creditsRattrapage;
    private Double coefMoyenne;
    
    // Références par ID plutôt qu'objets complets pour éviter la sérialisation circulaire
    private Long matiereId;
    private Long etudiantId;
    
    // Vous pouvez ajouter des champs supplémentaires pour les informations de base si nécessaire
    private String matiereNom;
    private String etudiantNom;
}