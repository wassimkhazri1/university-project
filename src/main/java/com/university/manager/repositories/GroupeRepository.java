package com.university.manager.repositories;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import com.university.manager.models.EGroupe;
import com.university.manager.models.Groupe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import java.util.Optional;

@Repository
public interface GroupeRepository extends JpaRepository<Groupe, Long> {
    Optional<Groupe> findByName(EGroupe name);
}