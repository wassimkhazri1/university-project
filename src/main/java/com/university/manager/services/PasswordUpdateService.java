package com.university.manager.services;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PasswordUpdateService {

    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public PasswordUpdateService(BCryptPasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    // Vérifier si l'ancien mot de passe est correct
    public boolean verifyOldPassword(String oldPassword, String storedPasswordHash) {
        return passwordEncoder.matches(oldPassword, storedPasswordHash);
    }

    // Hasher le nouveau mot de passe et retourner le hash
    public String hashNewPassword(String newPassword) {
        return passwordEncoder.encode(newPassword);
    }
}

