package com.university.manager.services;

import com.university.manager.Dto.MoyenneDTO;
import com.university.manager.models.Moyenne;
import com.university.manager.models.Etudiant;
import com.university.manager.repositories.MoyenneRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MoyenneServiceTest {

    @Mock
    private MoyenneRepository moyenneRepository;

    @InjectMocks
    private MoyenneService moyenneService;

    private Moyenne moyenne1;
    private Moyenne moyenne2;
    private MoyenneDTO moyenneDTO;

    @BeforeEach
    void setUp() {
        // Initialize test data
        moyenne1 = new Moyenne();
        moyenne1.setId(1L);
        moyenne1.setMoy(15.5);

        moyenne2 = new Moyenne();
        moyenne2.setId(2L);
        moyenne2.setMoy(12.75);

        moyenneDTO = new MoyenneDTO();
        moyenneDTO.setId(1L);
        moyenneDTO.setMoy(15.5);
    }

    @Test
    void getAllMoyennes_ShouldReturnAllMoyennes() {
        // Arrange
        List<Moyenne> expectedMoyennes = Arrays.asList(moyenne1, moyenne2);
        when(moyenneRepository.findAll()).thenReturn(expectedMoyennes);

        // Act
        List<Moyenne> actualMoyennes = moyenneService.getAllMoyennes();

        // Assert
        assertEquals(2, actualMoyennes.size());
        assertTrue(actualMoyennes.containsAll(expectedMoyennes));
        verify(moyenneRepository, times(1)).findAll();
    }

    @Test
    void ajouterMoyenne_ShouldSaveAndReturnMoyenne() {
        // Arrange
        when(moyenneRepository.save(moyenne1)).thenReturn(moyenne1);

        // Act
        Moyenne result = moyenneService.ajouterMoyenne(moyenne1);

        // Assert
        assertNotNull(result);
        assertEquals(moyenne1, result);
        verify(moyenneRepository, times(1)).save(moyenne1);
    }

    @Test
    void findEtuById_WithExistingId_ShouldReturnId() {
        // Arrange
        Long codeId = 1L;
        when(moyenneRepository.findEtuById(codeId)).thenReturn(Optional.of(codeId));

        // Act
        Long result = moyenneService.findEtuById(codeId);

        // Assert
        assertEquals(codeId, result);
        verify(moyenneRepository, times(1)).findEtuById(codeId);
    }

    @Test
    void findEtuById_WithNonExistingId_ShouldThrowException() {
        // Arrange
        Long invalidId = 99L;
        when(moyenneRepository.findEtuById(invalidId)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            moyenneService.findEtuById(invalidId);
        });
        assertEquals("Aucune moyenne trouvée pour l'étudiant avec l'ID : " + invalidId, exception.getMessage());
        verify(moyenneRepository, times(1)).findEtuById(invalidId);
    }

    @Test
    void modifierMoyenne_WithExistingEtudiantId_ShouldUpdateMoyenne() {
        // Arrange
        Etudiant etudiant = new Etudiant();
        etudiant.setId(1L); // ✅ on initialise l'objet Etudiant

        Moyenne updatedMoyenne = new Moyenne();
        updatedMoyenne.setMoy(18.0);
        updatedMoyenne.setEtudiant(etudiant); // ✅ on lie l'étudiant à la moyenne

        Moyenne moyenne1 = new Moyenne(); // s'assurer que moyenne1 n'est pas null
        moyenne1.setEtudiant(etudiant);
        moyenne1.setMoy(15.0); // valeur initiale simulée

        when(moyenneRepository.findByEtudiantId(1L)).thenReturn(Optional.of(moyenne1));
        when(moyenneRepository.save(any(Moyenne.class))).thenReturn(moyenne1);

        // Act
        Moyenne result = moyenneService.modifierMoyenne(updatedMoyenne);

        // Assert
        assertNotNull(result);
        assertEquals(18.0, result.getMoy()); // on vérifie que la mise à jour a été faite
        verify(moyenneRepository, times(1)).findByEtudiantId(1L);
        verify(moyenneRepository, times(1)).save(moyenne1);
    }

    @Test
    void modifierMoyenne_WithNonExistingEtudiantId_ShouldThrowException() {
        // Arrange
        Etudiant etudiant = new Etudiant();
        etudiant.setId(99L); // ✅ on initialise l'objet Etudiant
        
        Moyenne nonExistingMoyenne = new Moyenne();
        nonExistingMoyenne.setEtudiant(etudiant);

        when(moyenneRepository.findByEtudiantId(99L)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            moyenneService.modifierMoyenne(nonExistingMoyenne);
        });
        assertEquals("Moyenne non trouvée pour l'étudiant avec l'ID : " + 99L, exception.getMessage());
        verify(moyenneRepository, times(1)).findByEtudiantId(99L);
        verify(moyenneRepository, never()).save(any());
    }

    @Test
    void findByEtudiantId_WithExistingId_ShouldReturnMoyenne() {
        // Arrange
        Long etudiantId = 1L;
        when(moyenneRepository.findByEtudiantId(etudiantId)).thenReturn(Optional.of(moyenne1));

        // Act
        Optional<Moyenne> result = moyenneService.findByEtudiantId(etudiantId);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(moyenne1, result.get());
        verify(moyenneRepository, times(1)).findByEtudiantId(etudiantId);
    }

    @Test
    void findByEtudiantId_WithNonExistingId_ShouldReturnEmpty() {
        // Arrange
        Long etudiantId = 99L;
        when(moyenneRepository.findByEtudiantId(etudiantId)).thenReturn(Optional.empty());

        // Act
        Optional<Moyenne> result = moyenneService.findByEtudiantId(etudiantId);

        // Assert
        assertTrue(result.isEmpty());
        verify(moyenneRepository, times(1)).findByEtudiantId(etudiantId);
    }

    @Test
    void findByEtudiantId1_WithExistingId_ShouldReturnMoyenneDTO() {
        // Arrange
        Long etudiantId = 1L;
        when(moyenneRepository.findMoyennesByEtudiantId(etudiantId)).thenReturn(Optional.of(moyenneDTO));

        // Act
        Optional<MoyenneDTO> result = moyenneService.findByEtudiantId1(etudiantId);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(moyenneDTO, result.get());
        verify(moyenneRepository, times(1)).findMoyennesByEtudiantId(etudiantId);
    }

    @Test
    void findByEtudiantId1_WithNonExistingId_ShouldReturnEmpty() {
        // Arrange
        Long etudiantId = 99L;
        when(moyenneRepository.findMoyennesByEtudiantId(etudiantId)).thenReturn(Optional.empty());

        // Act
        Optional<MoyenneDTO> result = moyenneService.findByEtudiantId1(etudiantId);

        // Assert
        assertTrue(result.isEmpty());
        verify(moyenneRepository, times(1)).findMoyennesByEtudiantId(etudiantId);
    }
}
