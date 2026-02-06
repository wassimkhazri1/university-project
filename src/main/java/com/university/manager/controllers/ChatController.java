package com.university.manager.controllers;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.university.manager.services.ChatbotService;

import java.util.Map;

@RestController
@RequestMapping("/api/chatbot")
// Autorise React (port 3000) à communiquer avec Spring Boot (port 8080)
@CrossOrigin(origins = "http://localhost:3000") 
public class ChatController {

    private final ChatbotService chatbotService;

    // Injection par constructeur (recommandé pour la propreté du code)
    @Autowired
    public ChatController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    /**
     * Endpoint pour recevoir les questions de l'utilisateur
     * Le format attendu est JSON : { "message": "Bonjour" }
     */
    @PostMapping("/ask")
    public ResponseEntity<String> askGemini(@RequestBody Map<String, String> payload) {
        try {
            String userMessage = payload.get("message");
            
            if (userMessage == null || userMessage.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Le message ne peut pas être vide.");
            }

            // On appelle le service qui communique avec l'API Google
            String aiResponse = chatbotService.getAiResponse(userMessage);
            
            return ResponseEntity.ok(aiResponse);

        } catch (Exception e) {
            // En cas d'erreur (clé API invalide, réseau, etc.)
            return ResponseEntity.internalServerError()
                                 .body("Erreur lors de la communication avec l'IA : " + e.getMessage());
        }
    }
}
