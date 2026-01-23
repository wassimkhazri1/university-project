package com.university.manager.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {
	@Value("${file.upload-dir}")
	private String uploadDir;

	public String storeFile(MultipartFile file) throws IOException {
		String originalFilename = file.getOriginalFilename();
		String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
		String uniqueFileName = UUID.randomUUID().toString() + fileExtension;

		Path uploadPath = Paths.get(uploadDir);
		if (!Files.exists(uploadPath)) {
			Files.createDirectories(uploadPath);
		}

		Path filePath = uploadPath.resolve(uniqueFileName);
		Files.copy(file.getInputStream(), filePath);

		return uniqueFileName;
	}

	public void deleteFile(String filename) throws IOException {
		Path filePath = Paths.get(uploadDir).resolve(filename);
		Files.deleteIfExists(filePath);
	}

	public String getUploadDir() {
		return uploadDir;
	}
}
