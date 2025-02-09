package com.university.manager.models;


//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "ggroupes")
@Getter
@Setter
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom; // Ex: "Groupe 1", "Groupe 2"

//    @ManyToOne
//    @JoinColumn(name = "classe_id", nullable = false)
//    private Classe classe;

//    @OneToMany(mappedBy = "ggroupe", cascade = CascadeType.ALL)
//    private List<Etudiant> etudiants;

    public Group() {}

    public Group(String nom/*, Classe classe*/) {
        this.nom = nom;
      //  this.classe = classe;
    }

    // Getters et Setters
}

