package com.unimib.singletonsquad.doit.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JWTUtils {

    private final String secretKey = "3d3e383c39e98f0f9b5c984d54d57e6d6ab11e1b3e3b6897727e2b1f89c97c53a6d8f5088c9a56f568e1b6b637022bd3";

    private final long jwtExpiration = 300000000;

    private final long refreshExpiration = 360000000;

    /**
     * Ottieni la chiave di firma a partire dalla chiave segreta.
     */
    private SecretKey getSigningKey() {
        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * Genera un token JWT con il solo nome utente come soggetto.
     */
    public String generateToken(String username) {
        return generateToken(new HashMap<>(), username);
    }

    /**
     * Genera un token JWT con claims aggiuntivi e il nome utente.
     */
    public String generateToken(Map<String, Object> extraClaims, String username) {
        return buildToken(extraClaims, username, jwtExpiration);
    }

    /**
     * Genera un token di refresh.
     */
    public String generateRefreshToken(String username) {
        return buildToken(new HashMap<>(), username, refreshExpiration);
    }

    /**
     * Metodo interno per costruire un token con claims, username e durata.
     */
    private String buildToken(Map<String, Object> extraClaims, String username, long expiration) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Verifica se un token è valido.
     */
    public boolean verifyToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            // Logga l'eccezione per il debug (se necessario)
            // log.error("Token non valido: " + e.getMessage());
            return false;
        }
    }

    /**
     * Controlla se il token è scaduto.
     */
    public boolean isExpired(String token) {
        try {
            return extractExpiration(token).before(new Date());
        } catch (JwtException e) {
            // Tratta i token malformati come scaduti
            return true;
        }
    }

    /**
     * Rigenera un nuovo token se il vecchio token è valido e non scaduto.
     */
    public String refreshToken(String token) {
        if (!verifyToken(token) || isExpired(token)) {
            throw new JwtException("Token non valido o scaduto");
        }

        String username = extractUsername(token);
        return generateToken(username);
    }

    /**
     * Estrae il nome utente (subject) dal token.
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Estrae la data di scadenza dal token.
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Estrae un claim generico dal token utilizzando un resolver.
     */
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Estrae tutti i claims da un token.
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
