//package com.university.manager.utils;
//
//import com.university.manager.models.User;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//
//import java.util.Date;
//
//@Component
//public class JwtUtils {
//
//    @Value("${app.jwtSecret}")
//    private String jwtSecret;
//
//    @Value("${app.jwtExpirationMs}")
//    private int jwtExpirationMs;
//
//    public String generateJwtToken(User user) {
//        return Jwts.builder()
//                .setSubject(user.getUsername())
//                .setIssuedAt(new Date())
//                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
//                .signWith(SignatureAlgorithm.HS512, jwtSecret)
//                .compact();
//    }
//
//    public boolean validateJwtToken(String authToken) {
//        try {
//            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
//            return true;
//        } catch (Exception e) {
//            return false;
//        }
//    }
//
//    public String getUsernameFromJwtToken(String token) {
//        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
//    }
//}
