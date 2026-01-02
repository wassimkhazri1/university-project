package com.university.manager.security.jwt;

import java.security.Principal;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthChannelInterceptor implements ChannelInterceptor {

    private final JwtUtils jwtUtils;

    public JwtAuthChannelInterceptor(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor =
            MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            String authHeader = accessor.getFirstNativeHeader("Authorization");

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);

                if (jwtUtils.validateJwtToken(token)) {
                    String email = jwtUtils.getUserNameFromJwtToken(token);

                    // ⚡ Attacher le Principal
                    Principal principal = new UsernamePasswordAuthenticationToken(email, null, null);
                    accessor.setUser(principal);

                    System.out.println("CONNECT avec Principal: " + principal.getName());
                }
            }
        }

        return message;
    }

}
