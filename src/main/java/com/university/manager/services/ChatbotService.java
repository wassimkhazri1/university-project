package com.university.manager.services;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@Service
public class ChatbotService {

    @Value("${GEMINI_API_KEY}")
    private String apiKey;

    // L'URL pour Gemini 3 Flash (ou 1.5 Flash selon ta version)
    private final String GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=";

    public String getAiResponse(String userPrompt) {
        RestTemplate restTemplate = new RestTemplate();
        String url = GEMINI_URL + apiKey;

        // Corps de la requête JSON pour Google
        Map<String, Object> requestBody = Map.of(
            "contents", List.of(
                Map.of("parts", List.of(
                    Map.of("text", userPrompt)
                ))
            )
        );

        try {
            // Envoi de la requête
            Map<String, Object> response = restTemplate.postForObject(url, requestBody, Map.class);
            
            // Extraction de la réponse texte du JSON complexe de Google
            List candidates = (List) response.get("candidates");
            Map firstCandidate = (Map) candidates.get(0);
            Map content = (Map) firstCandidate.get("content");
            List parts = (List) content.get("parts");
            Map firstPart = (Map) parts.get(0);
            
            return (String) firstPart.get("text");
        } catch (Exception e) {
            return "Désolé, je rencontre une difficulté technique : " + e.getMessage();
        }
    }
}