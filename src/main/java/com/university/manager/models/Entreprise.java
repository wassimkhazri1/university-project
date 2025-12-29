package com.university.manager.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "entreprises")
@Getter
@Setter
@NoArgsConstructor  // Important : constructeur sans arguments
@AllArgsConstructor // Optionnel : constructeur avec tous les arguments
public class Entreprise extends Personne {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String matricule; // matricule fiscale
    private String nomcompany;
    private String owner;
    private String rhresponsible;
    private String adresse;
    private String fax;
    private String web;
    private String linkedin;
    

    
    // Constructeur avec paramètres (optionnel)
    public Entreprise(String matricule, String nomcompany, String owner, String rhresponsible, 
                     String adresse, String fax, String web, String linkedin) {
        this.matricule = matricule;
        this.nomcompany = nomcompany;
        this.owner = owner;
        this.rhresponsible = rhresponsible;
        this.adresse = adresse;
        this.fax = fax;
        this.web = web;
        this.linkedin = linkedin;
    }
    
    // Getters et Setters sont générés par Lombok (@Getter, @Setter)
}