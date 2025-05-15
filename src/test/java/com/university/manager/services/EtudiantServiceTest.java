package com.university.manager.services;
//CreatedAndDevelopedByWassimKhazri

//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.university.manager.models.*;
import com.university.manager.repositories.*;

@ExtendWith(MockitoExtension.class)
class EtudiantServiceTest {

	@Mock
	private EtudiantRepository etudiantRepository;

	@Mock
	private GroupRepository groupeRepository;

	@Mock
	private ClasseRepository classeRepository;

	@Mock
	private NiveauScolRepository niveauScolaireRepository;

	@Mock
	private BrancheRepository brancheRepository;

	@Mock
	private RoleRepository roleRepository;

	@Mock
	private PasswordEncoder passwordEncoder;

	@InjectMocks
	private EtudiantService etudiantService;

	private Etudiant etudiant;
	private Role studentRole;

	@BeforeEach
	void setUp() {
		// Initialisation des objets communs à plusieurs tests
		studentRole = new Role();
		studentRole.setName(ERole.ROLE_STUDENT);

		etudiant = new Etudiant();
		etudiant.setNom("Dupont");
		etudiant.setPrenom("Jean");
		etudiant.setCinNumber("12345678");
		etudiant.setEmail("jean.dupont@email.com");
		etudiant.setTelephone("0123456789");
		etudiant.setPassword("password123");
		etudiant.setGroupe(new Groupe());
		etudiant.setClasse(new Classe());
		etudiant.setNiveauScol(new NiveauScol());
		etudiant.setBranche(new Branche());
	}

	// CAS 1 : Création réussie d'un étudiant
	@Test
    void ajouterEtudiant_Success() {
        // Arrange
        when(roleRepository.findByName(ERole.ROLE_STUDENT)).thenReturn(Optional.of(studentRole));
        when(groupeRepository.findById(any())).thenReturn(Optional.of(new Groupe()));
        when(classeRepository.findById(any())).thenReturn(Optional.of(new Classe()));
        when(niveauScolaireRepository.findById(any())).thenReturn(Optional.of(new NiveauScol()));
        when(brancheRepository.findById(any())).thenReturn(Optional.of(new Branche()));
        when(passwordEncoder.encode(any())).thenReturn("encodedPassword");
        when(etudiantRepository.save(any())).thenReturn(etudiant);

        // Act
        Etudiant result = etudiantService.ajouterEtudiant(etudiant);

        // Assert
        assertNotNull(result);
        assertEquals("encodedPassword", result.getPassword());
        assertTrue(result.getRoles().contains(studentRole));
        
        // Vérification des appels aux dépendances
        verify(passwordEncoder).encode("password123");
        verify(etudiantRepository).save(etudiant);
    }

	// CAS 2 : Rôle étudiant non trouvé
	@Test
    void ajouterEtudiant_RoleNotFound_ThrowsException() {
        // Arrange
        when(roleRepository.findByName(ERole.ROLE_STUDENT)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            etudiantService.ajouterEtudiant(etudiant);
        });

        assertEquals("Rôle non trouvé", exception.getMessage());
        verify(etudiantRepository, never()).save(any());
    }

	// CAS 3 : Groupe non trouvé
	@Test
    void ajouterEtudiant_GroupeNotFound_ThrowsException() {
        // Arrange
        when(roleRepository.findByName(ERole.ROLE_STUDENT)).thenReturn(Optional.of(studentRole));
        when(groupeRepository.findById(any())).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            etudiantService.ajouterEtudiant(etudiant);
        });

        assertEquals("Groupe non trouvé !", exception.getMessage());
    }

	// CAS 4 : Test du chiffrement du mot de passe
	@Test
    void ajouterEtudiant_PasswordIsEncrypted() {
        // Arrange
        when(roleRepository.findByName(ERole.ROLE_STUDENT)).thenReturn(Optional.of(studentRole));
        when(groupeRepository.findById(any())).thenReturn(Optional.of(new Groupe()));
        when(classeRepository.findById(any())).thenReturn(Optional.of(new Classe()));
        when(niveauScolaireRepository.findById(any())).thenReturn(Optional.of(new NiveauScol()));
        when(brancheRepository.findById(any())).thenReturn(Optional.of(new Branche()));
        
        // Mock password encoding
        String encodedPassword = "encoded123";
        when(passwordEncoder.encode("password123")).thenReturn(encodedPassword);
        
        // Mock save to return the student with encoded password
        when(etudiantRepository.save(any(Etudiant.class))).thenAnswer(invocation -> {
            Etudiant savedEtudiant = invocation.getArgument(0);
            return savedEtudiant;
        });

        // Act
        Etudiant result = etudiantService.ajouterEtudiant(etudiant);

        // Assert
        assertEquals(encodedPassword, result.getPassword());
        verify(passwordEncoder).encode("password123");
        verify(etudiantRepository).save(any(Etudiant.class));
    }

	@Test
	void modifierEtudiant_Success() {
		// Arrange
		Long etudiantId = 1L, groupeId = 2L, classeId = 3L, niveauId = 4L;

		Etudiant existingEtudiant = new Etudiant();
		existingEtudiant.setId(etudiantId);
		existingEtudiant.setNom("Old Nom");

		Etudiant newDetails = new Etudiant();
		newDetails.setNom("Nouveau Nom");

		Groupe groupe = new Groupe();
		groupe.setId(groupeId);
		Classe classe = new Classe();
		classe.setId(classeId);
		NiveauScol niveau = new NiveauScol();
		niveau.setId(niveauId);

		// Mock
		when(etudiantRepository.findById(etudiantId)).thenReturn(Optional.of(existingEtudiant));
		when(groupeRepository.findById(groupeId)).thenReturn(Optional.of(groupe));
		when(classeRepository.findById(classeId)).thenReturn(Optional.of(classe));
		when(niveauScolaireRepository.findById(niveauId)).thenReturn(Optional.of(niveau));
		when(etudiantRepository.save(any(Etudiant.class))).thenAnswer(invocation -> invocation.getArgument(0));

		// Act
		Etudiant result = etudiantService.modifierEtudiant(etudiantId, newDetails, groupeId, classeId, niveauId);

		// Assert
		assertEquals("Nouveau Nom", result.getNom());
		assertEquals(groupeId, result.getGroupe().getId());
		assertEquals(classeId, result.getClasse().getId());
		assertEquals(niveauId, result.getNiveauScol().getId());
		verify(etudiantRepository).save(any(Etudiant.class));
	}

	@Test
    void modifierEtudiant_StudentNotFound_ThrowsException() {
        // Arrange
        when(etudiantRepository.findById(any())).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(RuntimeException.class, () -> {
            etudiantService.modifierEtudiant(1L, new Etudiant(), 2L, 3L, 4L);
        });
        
        verify(etudiantRepository, never()).save(any());
    }

	@Test
	void typeNiveauScol_PremiereAnnee_ReturnsCorrectLabel() {
		assertEquals("1 ère année", etudiantService.typeNiveauScol("PREMIERE_ANNEE"));
	}

	@Test
	void typeNiveauScol_DefaultCase_ReturnsEmptyString() {
		assertEquals("", etudiantService.typeNiveauScol("INVALID_VALUE"));
	}

	@Test
	void deleteEtudiant_CallsRepository() {
		// Act
		etudiantService.deleteEtudiant(1L);

		// Assert
		verify(etudiantRepository).deleteById(1L);
	}

	@ParameterizedTest
	@CsvSource({ "PREMIERE_ANNEE, 1 ère année", "DEUXIEME_ANNEE, 2 ème année" })
	void typeNiveauScol_Parametrized(String input, String expected) {
		assertEquals(expected, etudiantService.typeNiveauScol(input));
	}
}
