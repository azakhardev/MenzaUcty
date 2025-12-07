package cz.vse.menza_api.services;

import cz.vse.menza_api.exceptions.InvalidCredentialsException;
import cz.vse.menza_api.models.User;
import cz.vse.menza_api.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class) // Zapne Mockito
class UserServiceTest {

    @Mock // Vytvoří falešný UserRepository
    private UserRepository userRepository;

    @InjectMocks // Vloží falešný repozitář do skutečného UserService
    private UserService userService;

    @Test
    void topUpBalance_ShouldIncreaseBalance_WhenUserExistsAndAmountIsPositive() {
        // 1. Příprava dat (Arrange)
        Long userId = 1L;
        BigDecimal initialBalance = new BigDecimal("100.00");
        BigDecimal amountToAdd = new BigDecimal("50.00");

        User mockUser = new User();
        mockUser.setId(userId);
        mockUser.setBalance(initialBalance);

        // Řekneme Mockitu: "Když se někdo zeptá na findById(1), vrať tohoto uživatele"
        when(userRepository.findById(userId)).thenReturn(Optional.of(mockUser));

        // 2. Akce (Act)
        BigDecimal newBalance = userService.topUpBalance(userId, amountToAdd);

        // 3. Ověření (Assert)
        assertEquals(new BigDecimal("150.00"), newBalance); // 100 + 50 = 150
        assertEquals(new BigDecimal("150.00"), mockUser.getBalance()); // Změnilo se to v objektu?

        // Ověříme, že se zavolala metoda save()
        verify(userRepository).save(mockUser);
    }

    @Test
    void topUpBalance_ShouldThrowException_WhenAmountIsNegative() {
        // Testujeme logiku validace - DB ani nepotřebujeme volat
        Long userId = 1L;
        when(userRepository.findById(userId)).thenReturn(Optional.of(new User()));

        assertThrows(IllegalArgumentException.class, () -> {
            userService.topUpBalance(userId, new BigDecimal("-10"));
        });

        // Ujistíme se, že se nic neuložilo
        verify(userRepository, never()).save(any());
    }

    @Test
    void login_ShouldReturnUser_WhenPasswordMatches() throws Exception {
        String username = "pepa";
        String password = "password123";

        User mockUser = new User();
        mockUser.setUsername(username);
        mockUser.setPassword(password); // V reálu by mělo být hashované, ale pro školní projekt ok

        when(userRepository.getUserByUsername(username)).thenReturn(mockUser);

        User result = userService.login(username, password);

        assertNotNull(result);
        assertEquals(username, result.getUsername());
    }

    @Test
    void login_ShouldThrowException_WhenPasswordIsWrong() {
        String username = "pepa";
        User mockUser = new User();
        mockUser.setUsername(username);
        mockUser.setPassword("spravneHeslo");

        when(userRepository.getUserByUsername(username)).thenReturn(mockUser);

        assertThrows(InvalidCredentialsException.class, () -> {
            userService.login(username, "spatneHeslo");
        });
    }
}