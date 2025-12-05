package com.banking.system2.controller;

import com.banking.system2.entity.Card;
import com.banking.system2.entity.User;
import com.banking.system2.repository.CardRepository;
import com.banking.system2.repository.UserRepository;
import com.banking.system2.util.HashUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CardRepository cardRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String password = payload.get("password");

        if (username == null || password == null) {
            return ResponseEntity.badRequest().body("Username and password required");
        }

        Optional<User> userOpt = userRepository.findById(username);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        User user = userOpt.get();
        String hashedPass = HashUtil.hashPin(password);
        if (!user.getPasswordHash().equals(hashedPass)) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        // Login success
        String role = user.getRole();
        String cardNumber = null;

        if ("CUSTOMER".equals(role)) {
            var cards = cardRepository.findByUsername(username);
            if (!cards.isEmpty()) {
                cardNumber = cards.get(0).getCardNumber();
            }
        }

        return ResponseEntity.ok(Map.of(
                "username", username,
                "role", role,
                "cardNumber", cardNumber != null ? cardNumber : ""));
    }
}
