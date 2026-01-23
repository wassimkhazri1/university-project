package com.university.manager.controllers;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.university.manager.models.Candidature;
import com.university.manager.models.DocumentAdministratif;

import com.university.manager.repositories.DocumentAdministratifRepository;

import com.university.manager.services.FileStorageService;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "http://localhost:3000") // Autoriser les requêtes depuis React
public class DocumentAdministratifController {

	@Autowired
	private DocumentAdministratifRepository documentAdministratifRepository;

	@Autowired
	private FileStorageService fileStorageService;

	@GetMapping
	public List<DocumentAdministratif> getAllCandidatures() {
		return documentAdministratifRepository.findAll();
	}

	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public DocumentAdministratif createDocument(
	        @RequestParam("documentFile") MultipartFile docFile,
	        @RequestParam("name") String name) throws IOException {

	    DocumentAdministratif document = new DocumentAdministratif();
	    document.setDocumentPath(fileStorageService.storeFile(docFile));
	    document.setName(name);

	    return documentAdministratifRepository.save(document);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteDocument(@PathVariable Long id) throws IOException {
	    DocumentAdministratif doc = documentAdministratifRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Document non trouvé"));

	    // Supprimer le fichier physique
	    fileStorageService.deleteFile(doc.getDocumentPath());

	    // Supprimer l'entrée en base
	    documentAdministratifRepository.deleteById(id);

	    return ResponseEntity.ok().build();
	}

	
	
	@GetMapping("/{id}/download")
	public ResponseEntity<Resource> downloadDoc(@PathVariable Long id) throws IOException {
	    DocumentAdministratif documentAdministratif = documentAdministratifRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Document non trouvé"));

	    return downloadFile(documentAdministratif.getDocumentPath(), documentAdministratif.getName());
	}

	private ResponseEntity<Resource> downloadFile(String filename, String displayName) throws IOException {
	    Path filePath = Paths.get(fileStorageService.getUploadDir()).resolve(filename).normalize();
	    Resource resource = new UrlResource(filePath.toUri());

	    if (!resource.exists()) {
	        throw new RuntimeException("Fichier non trouvé");
	    }

	    // ⚡ Utiliser le nom lisible si disponible
	    String downloadName = (displayName != null && !displayName.isBlank())
	            ? displayName.replaceAll("\\s+", "_") + getExtension(filename)
	            : resource.getFilename();

	    return ResponseEntity.ok()
	            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + downloadName + "\"")
	            .contentType(MediaType.APPLICATION_OCTET_STREAM)
	            .body(resource);
	}

	private String getExtension(String filename) {
	    int dotIndex = filename.lastIndexOf(".");
	    return (dotIndex != -1) ? filename.substring(dotIndex) : "";
	}


}
