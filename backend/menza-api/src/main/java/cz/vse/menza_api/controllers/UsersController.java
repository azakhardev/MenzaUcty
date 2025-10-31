package cz.vse.menza_api.controllers;

import cz.vse.menza_api.models.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UsersController {
    @GetMapping("/users")
    public ResponseEntity<List<User>> helloWorld() {
        User user = new User(1L, "dummyUser", "123456", 0);

        return ResponseEntity.ok(List.of(user));
    }
}
