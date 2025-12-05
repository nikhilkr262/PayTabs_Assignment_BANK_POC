package com.banking.system2.controller;

import com.banking.system2.entity.TransactionEntity;
import com.banking.system2.entity.Card;
import com.banking.system2.service.CoreBankingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class ProcessingController {

    @Autowired
    private CoreBankingService coreBankingService;

    @PostMapping("/process")
    public ResponseEntity<?> process(@RequestBody Map<String, Object> payload,
            @RequestHeader(value = "X-Source-System", required = false) String sourceSystem) {
        if (!"System1".equals(sourceSystem)) {
            return ResponseEntity.status(403).body("Access Denied: Direct access not allowed. Use System 1.");
        }

        String cardNumber = (String) payload.get("cardNumber");
        String pin = (String) payload.get("pin");
        Double amount = Double.valueOf(payload.get("amount").toString());
        String type = (String) payload.get("type");

        TransactionEntity result = coreBankingService.processTransaction(cardNumber, pin, amount, type);
        if ("FAILED".equals(result.getStatus())) {
            return ResponseEntity.badRequest().body(result);
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/transactions")
    public List<TransactionEntity> getAllTransactions() {
        return coreBankingService.getAllTransactions();
    }

    @GetMapping("/transactions/{cardNumber}")
    public List<TransactionEntity> getCustomerTransactions(@PathVariable String cardNumber) {
        return coreBankingService.getTransactionsByCard(cardNumber);
    }

    @GetMapping("/transactions/user/{username}")
    public List<TransactionEntity> getUserTransactions(@PathVariable String username) {
        return coreBankingService.getTransactionsByUsername(username);
    }

    @GetMapping("/cards/user/{username}")
    public List<Card> getUserCards(@PathVariable String username) {
        return coreBankingService.getCardsByUsername(username);
    }

    @GetMapping("/balance/{cardNumber}")
    public ResponseEntity<?> getBalance(@PathVariable String cardNumber) {
        var card = coreBankingService.getCard(cardNumber);
        if (card != null) {
            return ResponseEntity.ok(Map.of("balance", card.getBalance()));
        }
        return ResponseEntity.notFound().build();
    }
}
