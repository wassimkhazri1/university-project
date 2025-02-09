package com.university.manager.controllers;

import com.itextpdf.text.DocumentException;
import com.university.manager.Dto.UserDTO;
import com.university.manager.exception.SpecificExceptionType;
import com.university.manager.models.ERole;
import com.university.manager.models.Groupe;
import com.university.manager.models.Role;
import com.university.manager.models.User;
import com.university.manager.repositories.GroupeRepository;
import com.university.manager.repositories.RoleRepository;
import com.university.manager.repositories.UserRepository;
import com.university.manager.services.UserService;
import com.university.manager.services.UserServiceImpl;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	@Autowired
	private UserService userService;
	@Autowired
	private UserServiceImpl userServiceImpl;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private GroupeRepository groupeRepository;

	// Créer un nouvel utilisateur avec un rôle
	@PostMapping("/create")
	public ResponseEntity<?> createUser(@RequestBody User user) {
		Optional<Role> role = roleRepository.findByName(user.getRole().getName());
		Optional<Groupe> groupe = groupeRepository.findByName(user.getGroupe().getName());

		if (role.isEmpty() || groupe.isEmpty()) {
			Map<String, String> errorResponse = new HashMap<>();
			if (role.isEmpty())
				errorResponse.put("error", "Role not found");
			if (groupe.isEmpty())
				errorResponse.put("error", "Groupe not found");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
		}

		user.setRole(role.get());
		user.setGroupe(groupe.get());
		userRepository.save(user);
		return ResponseEntity.ok(user);
	}

	// Récupérer tous les utilisateurs
	@GetMapping
	public ResponseEntity<Map<String, Object>> getAllUsers() {
		try {
			List<User> listusers = userService.listUsers();

			List<UserDTO> userDTOs = listusers.stream().map(this::convertToDto).collect(Collectors.toList());

			Map<String, Object> response = new HashMap<>();
			response.put("users", userDTOs);

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (SpecificExceptionType e) { // Replace with specific exceptions
			// Log the exception
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			// Log the exception
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// Récupérer un utilisateur par ID
	@GetMapping("/{id}")
	public ResponseEntity<UserDTO> getCompteById(@PathVariable Long id) {
		Optional<User> user = userService.findUserById(id);
		if (user.isPresent()) {
			UserDTO userDTO = convertToDto(user.get());
			Map<String, Object> response = new HashMap<>();
			response.put("user", userDTO);
			return new ResponseEntity<>(userDTO, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// Mettre à jour un utilisateur
	@PutMapping("/{id}")
	public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
		Optional<User> userOptional = userRepository.findById(id);
		if (userOptional.isPresent()) {
			User user = userOptional.get();
			user.setFirstName(userDetails.getFirstName());
			user.setLastName(userDetails.getLastName());
			user.setEmail(userDetails.getEmail());
			user.setCinNumber(userDetails.getCinNumber());
			user.setNiveauScolaire(userDetails.getNiveauScolaire());
			// user.setGroupe(userDetails.getGroupe());
			user.setPhoto(userDetails.getPhoto());
			// Si besoin, mettre à jour d'autres champs...

			// Vérification et mise à jour du rôle et du groupe
			Optional<Role> role = roleRepository.findByName(userDetails.getRole().getName());
			Optional<Groupe> groupe = groupeRepository.findByName(userDetails.getGroupe().getName());

			role.ifPresent(user::setRole);
			groupe.ifPresent(user::setGroupe);

			userRepository.save(user);
			return ResponseEntity.ok(user);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// Supprimer un utilisateur
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
		if (userRepository.existsById(id)) {
			userRepository.deleteById(id);
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("/export/pdf/{id}")
	public void exportToPdf(@PathVariable Long id, HttpServletResponse response) throws IOException, DocumentException {
		response.setContentType("application/pdf");
		response.setHeader("Content-Disposition", "attachment; filename=operations.pdf");
		Optional<User> userOptional = userRepository.findById(id);
		userServiceImpl.exportUserToPdf(userOptional, response);
	}

	@GetMapping("/export/pdf")
	public void exportToPdf(HttpServletResponse response) throws IOException, DocumentException {
	    // Récupérer tous les utilisateurs
	    List<User> users = userRepository.findAllUsers();

	    // Configurer la réponse HTTP pour un fichier PDF
	    response.setContentType("application/pdf");
	    response.setHeader("Content-Disposition", "attachment; filename=all_users_operations.pdf");

	    // Passer la liste des utilisateurs au service pour générer le PDF
	    userServiceImpl.exportAllUsersToPdf(users, response);
	}

	public UserDTO convertToDto(User user) {
		UserDTO dto = new UserDTO();
		dto.setId(user.getId());
		dto.setFirstName(user.getFirstName());
		dto.setLastName(user.getLastName());
		dto.setEmail(user.getEmail());
		dto.setCinNumber(user.getCinNumber());
		dto.setMatricule(user.getMatricule());
		dto.setPassword(user.getPassword());
		dto.setNiveauScolaire(user.getNiveauScolaire());
		dto.setPhoto(user.getPhoto());

		if (user.getGroupe() != null) {
			dto.setGroupeId(user.getGroupe().getId());
		}
		if (user.getRole() != null) {
			dto.setRoleId(user.getRole().getId());
		}

		return dto;
	}

}
