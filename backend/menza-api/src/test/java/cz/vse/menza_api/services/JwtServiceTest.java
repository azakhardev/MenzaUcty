package cz.vse.menza_api.services;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceTest {
    private final JwtService jwtService = new JwtService();

    @Test
    void generateToken_ShouldCreateValidTokenForUsername() {
        String username = "testUser";

        // 1. Vygeneruj token
        String token = jwtService.generateToken(username);

        // 2. Ověř, že není prázdný
        assertNotNull(token);
        assertFalse(token.isEmpty());

        // 3. Ověř, že z něj jde vytáhnout správné jméno
        String extractedUsername = jwtService.extractUsername(token);
        assertEquals(username, extractedUsername);
    }

    @Test
    void isTokenValid_ShouldReturnFalse_WhenUsernameDoesNotMatch() {
        String token = jwtService.generateToken("userA");

        // Token je pro userA, ale ptáme se, jestli je platný pro userB
        boolean isValid = jwtService.isTokenValid(token, "userB");

        assertFalse(isValid);
    }

    @Test
    void isTokenValid_ShouldReturnTrue_WhenUsernameMatches() {
        String token = jwtService.generateToken("userA");
        boolean isValid = jwtService.isTokenValid(token, "userA");
        assertTrue(isValid);
    }
}
