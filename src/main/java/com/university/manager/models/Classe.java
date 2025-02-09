package com.university.manager.models;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "classes")
@Getter
@Setter
public class Classe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;  // Ex: "Classe A", "Classe B"

	@ManyToMany
    @JoinTable(
        name = "professeur_classe",
        joinColumns = @JoinColumn(name = "classe_id"),
        inverseJoinColumns = @JoinColumn(name = "professeur_id")
    )
    private List<Professeur> professeurs = new ArrayList<>();
//    @ManyToOne
//    @JoinColumn(name = "branche_id", nullable = false)
//    private Branche branche;
//
//    @OneToMany(mappedBy = "classe", cascade = CascadeType.ALL)
//    private List<Group> groups;

    public Classe() {}

    public Classe(String nom/*, Branche branche*/) {
        this.nom = nom;
      //  this.branche = branche;
    }

}

