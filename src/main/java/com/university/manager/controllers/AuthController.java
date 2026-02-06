package com.university.manager.controllers;

import java.io.IOException;
import java.util.Base64;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.university.manager.models.Admin;
import com.university.manager.models.ERole;
import com.university.manager.models.Etudiant;
import com.university.manager.models.Role;
import com.university.manager.models.Personne;
import com.university.manager.models.Professeur;
import com.university.manager.payload.request.LoginRequest;
import com.university.manager.payload.request.SignupRequest;
import com.university.manager.payload.response.JwtResponse;
import com.university.manager.payload.response.MessageResponse;
import com.university.manager.repositories.PersonneRepository;
import com.university.manager.repositories.RoleRepository;
import com.university.manager.security.jwt.JwtUtils;
import com.university.manager.security.services.TokenBlacklistService;
import com.university.manager.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	PersonneRepository personneRepository;
//	CreatedAndDevelopedByWassimKhazri
//	https://www.linkedin.com/in/wassim-khazri-ab923a14b/
	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@Autowired
	private TokenBlacklistService tokenBlacklistService;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());
//		CreatedAndDevelopedByWassimKhazri
//		https://www.linkedin.com/in/wassim-khazri-ab923a14b/
		return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(),
				userDetails.getEmail(), null, roles));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@ModelAttribute SignupRequest signUpRequest) throws IOException {
		// Vérifications existantes (email, cin, etc.)
		if (personneRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
		}
		// ... autres vérifications

		// Crée la bonne sous-classe selon le rôle
		Personne user;
		Set<String> strRoles = signUpRequest.getRole();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			// Par défaut, STUDENT
			user = new Etudiant();
			Role userRole = roleRepository.findByName(ERole.ROLE_STUDENT)
					.orElseThrow(() -> new RuntimeException("Error: Role not found."));
			roles.add(userRole);
		} else {
			// Vérifie le premier rôle (simplifié)
			String primaryRole = strRoles.iterator().next();
			switch (primaryRole) {
			case "admin":
				user = new Admin();
				roles.add(roleRepository.findByName(ERole.ROLE_ADMIN).orElseThrow());
				break;
			case "prof":
				user = new Professeur();
				roles.add(roleRepository.findByName(ERole.ROLE_PROF).orElseThrow());
				break;
			default:
				user = new Etudiant();
				roles.add(roleRepository.findByName(ERole.ROLE_STUDENT).orElseThrow());
			}
		}

		// Set les propriétés communes
		user.setNom(signUpRequest.getNom());
		user.setPrenom(signUpRequest.getPrenom());
		user.setEmail(signUpRequest.getEmail());
		user.setCinNumber(signUpRequest.getCinNumber());
		user.setTelephone(signUpRequest.getTelephone());
		user.setPassword(encoder.encode(signUpRequest.getPassword()));
		user.setRoles(roles);

		personneRepository.save(user); // Sauvegarde la sous-classe (Etudiant, Admin, etc.)
		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}

	@PostMapping("/signout")
	public ResponseEntity<?> signOutUser(HttpServletRequest request) {
		// Extract the JWT token from the request header
		String token = request.getHeader("Authorization");

		if (token != null && token.startsWith("Bearer ")) {
			token = token.substring(7); // Remove "Bearer " prefix

			// Optionally, blacklist the token
			tokenBlacklistService.blacklistToken(token);

			return ResponseEntity.ok().body("User signed out successfully.");
		} else {
			return ResponseEntity.badRequest().body("No valid token found.");
		}
	}

}
