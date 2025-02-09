package com.university.manager.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
@Entity
@Table(name = "branches")
@Getter
@Setter
public class Branche {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;  // Ex: Informatique, Mathématiques

//    @ManyToOne
//    @JoinColumn(name = "niveau_id", nullable = false)
//    private NiveauScol niveauScolaire;
//
//    @OneToMany(mappedBy = "branche", cascade = CascadeType.ALL)
//    private List<Classe> classes;

    public Branche() {}

    public Branche(String nom/*, NiveauScol niveauScolaire*/) {
        this.nom = nom;
       // this.niveauScolaire = niveauScolaire;
    }

    // Getters et Setters
}


