package com.university.manager.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic", "/queue");
        config.setApplicationDestinationPrefixes("/app");
        config.setUserDestinationPrefix("/user");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Avec SockJS (pour compatibilité)
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("http://localhost:3000", "http://127.0.0.1:3000")
                .withSockJS()
                .setSuppressCors(true);
        
        // Sans SockJS (pour les tests direct WebSocket)
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("http://localhost:3000", "http://127.0.0.1:3000");
    }

    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration registration) {
        registration.setMessageSizeLimit(128 * 1024);
        registration.setSendTimeLimit(20 * 1000);
        registration.setSendBufferSizeLimit(512 * 1024);
    }
}