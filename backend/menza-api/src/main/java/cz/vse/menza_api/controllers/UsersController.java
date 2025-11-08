package cz.vse.menza_api.controllers;

import cz.vse.menza_api.dto.LoginCredentials;
import cz.vse.menza_api.dto.TopUpRequest;
import cz.vse.menza_api.models.Meal;
import cz.vse.menza_api.models.User;
import cz.vse.menza_api.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UsersController {

    private final UserService userService;

    public UsersController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(user);
    }

    @GetMapping("/{id}/balance")
    public ResponseEntity<BigDecimal> getUserBalance(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user == null) return ResponseEntity.notFound().build();

        return ResponseEntity.ok(user.getBalance());
    }

    @GetMapping("/{id}/history")
    public ResponseEntity<List<Meal>> getUserHistory(@PathVariable Long id) {
        List<Meal> history = userService.getUserHistory(id);
        return ResponseEntity.ok(history);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginCredentials user) throws Exception {
        User u = userService.login(user.getUsername(), user.getPassword());

        return ResponseEntity.ok(u);
    }

    @PostMapping("/topup")
    public ResponseEntity<BigDecimal> topUp(@RequestBody TopUpRequest topUp) {
        BigDecimal newBalance = userService.topUpBalance(topUp.getUserId(), topUp.getAmount());

        return ResponseEntity.ok(newBalance);
    }
}
