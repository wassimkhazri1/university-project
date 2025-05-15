package com.university.manager.services;

import com.university.manager.models.JobOfferForm;
import com.university.manager.repositories.JobOfferFormRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class JobOfferFormServiceTest {

	@Mock
	private JobOfferFormRepository jobOfferFormRepository;

	@InjectMocks
	private JobOfferFormService jobOfferFormService;

	private JobOfferForm jobOfferForm1;
	private JobOfferForm jobOfferForm2;

	@BeforeEach
	void setUp() {
		jobOfferForm1 = new JobOfferForm();
		jobOfferForm1.setId(1L);
		jobOfferForm1.setCompany("Tech Corp");
		jobOfferForm1.setJobTitle("Software Engineer");

		jobOfferForm2 = new JobOfferForm();
		jobOfferForm2.setId(2L);
		jobOfferForm2.setCompany("Data Inc");
		jobOfferForm2.setJobTitle("Data Analyst");
	}

	@Test
	void getAllJobOffers_ShouldReturnAllJobOffers() {
		// Arrange
		List<JobOfferForm> expectedJobOffers = Arrays.asList(jobOfferForm1, jobOfferForm2);
		when(jobOfferFormRepository.findAll()).thenReturn(expectedJobOffers);

		// Act
		List<JobOfferForm> actualJobOffers = jobOfferFormService.getAllJobOffers();

		// Assert
		assertEquals(2, actualJobOffers.size());
		assertTrue(actualJobOffers.containsAll(expectedJobOffers));
		verify(jobOfferFormRepository, times(1)).findAll();
	}

	@Test
	void getJobOfferById_WithValidId_ShouldReturnJobOffer() {
		// Arrange
		Long id = 1L;
		when(jobOfferFormRepository.findById(id)).thenReturn(Optional.of(jobOfferForm1));

		// Act
		JobOfferForm result = jobOfferFormService.getJobOfferById(id);

		// Assert
		assertNotNull(result);
		assertEquals(id, result.getId());
		assertEquals("Tech Corp", result.getCompany());
		verify(jobOfferFormRepository, times(1)).findById(id);
	}

	@Test
	void getJobOfferById_WithInvalidId_ShouldThrowException() {
		// Arrange
		Long invalidId = 99L;
		when(jobOfferFormRepository.findById(invalidId)).thenReturn(Optional.empty());

		// Act & Assert
		assertThrows(RuntimeException.class, () -> {
			jobOfferFormService.getJobOfferById(invalidId);
		});
		verify(jobOfferFormRepository, times(1)).findById(invalidId);
	}

	@Test
    void createJobOffer_ShouldSaveAndReturnJobOffer() {
        // Arrange
        when(jobOfferFormRepository.save(jobOfferForm1)).thenReturn(jobOfferForm1);

        // Act
        JobOfferForm result = jobOfferFormService.createJobOffer(jobOfferForm1);

        // Assert
        assertNotNull(result);
        assertEquals(jobOfferForm1, result);
        verify(jobOfferFormRepository, times(1)).save(jobOfferForm1);
    }

	@Test
	void updateJobOffer_WithValidId_ShouldUpdateAndReturnJobOffer() {
		// Arrange
		Long id = 1L;
		JobOfferForm updatedDetails = new JobOfferForm();
		updatedDetails.setCompany("Updated Tech Corp");
		updatedDetails.setJobTitle("Senior Software Engineer");

		when(jobOfferFormRepository.findById(id)).thenReturn(Optional.of(jobOfferForm1));
		when(jobOfferFormRepository.save(jobOfferForm1)).thenReturn(jobOfferForm1);

		// Act
		JobOfferForm result = jobOfferFormService.updateJobOffer(id, updatedDetails);

		// Assert
		assertNotNull(result);
		assertEquals("Updated Tech Corp", result.getCompany());
		assertEquals("Senior Software Engineer", result.getJobTitle());
		verify(jobOfferFormRepository, times(1)).findById(id);
		verify(jobOfferFormRepository, times(1)).save(jobOfferForm1);
	}

	@Test
	void updateJobOffer_WithInvalidId_ShouldThrowException() {
		// Arrange
		Long invalidId = 99L;
		when(jobOfferFormRepository.findById(invalidId)).thenReturn(Optional.empty());

		// Act & Assert
		assertThrows(RuntimeException.class, () -> {
			jobOfferFormService.updateJobOffer(invalidId, jobOfferForm1);
		});
		verify(jobOfferFormRepository, times(1)).findById(invalidId);
		verify(jobOfferFormRepository, never()).save(any());
	}

	@Test
	void deleteJobOffer_WithValidId_ShouldDeleteJobOffer() {
		// Arrange
		Long id = 1L;
		when(jobOfferFormRepository.findById(id)).thenReturn(Optional.of(jobOfferForm1));
		doNothing().when(jobOfferFormRepository).delete(jobOfferForm1);

		// Act
		jobOfferFormService.deleteJobOffer(id);

		// Assert
		verify(jobOfferFormRepository, times(1)).findById(id);
		verify(jobOfferFormRepository, times(1)).delete(jobOfferForm1);
	}

	@Test
	void deleteJobOffer_WithInvalidId_ShouldThrowException() {
		// Arrange
		Long invalidId = 99L;
		when(jobOfferFormRepository.findById(invalidId)).thenReturn(Optional.empty());

		// Act & Assert
		assertThrows(RuntimeException.class, () -> {
			jobOfferFormService.deleteJobOffer(invalidId);
		});
		verify(jobOfferFormRepository, times(1)).findById(invalidId);
		verify(jobOfferFormRepository, never()).delete(any());
	}
}
