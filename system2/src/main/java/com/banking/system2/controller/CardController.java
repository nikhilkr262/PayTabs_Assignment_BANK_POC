package com.banking.system2.controller;

import com.banking.system2.entity.Card;
import com.banking.system2.service.CoreBankingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/cards")
@CrossOrigin(origins = "*")
public class CardController {

    @Autowired
    private CoreBankingService coreBankingService;

    @PostMapping
    public ResponseEntity<?> registerCard(@RequestBody Map<String, Object> payload) {
        try {
            String cardNumber = (String) payload.get("cardNumber");
            String pin = (String) payload.get("pin");
            Double balance = Double.valueOf(payload.get("balance").toString());
            String username = (String) payload.get("username");

            if (cardNumber == null || pin == null || balance == null || username == null) {
                return ResponseEntity.badRequest().body("Missing required fields");
            }

            Card card = coreBankingService.registerCard(cardNumber, pin, balance, username);
            return ResponseEntity.ok(card);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error registering card");
        }
    }
}
