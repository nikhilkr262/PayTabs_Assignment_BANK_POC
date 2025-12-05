package com.banking.system1.controller;

import com.banking.system1.model.TransactionRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/transaction")
@CrossOrigin(origins = "*")
public class TransactionController {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String SYSTEM2_URL = "http://localhost:8082/process";

    @PostMapping
    public ResponseEntity<?> handleTransaction(@RequestBody TransactionRequest request) {
        //Accepting transaction requests here (withdrawals and top-ups)
        if (request.getCardNumber() == null || request.getPin() == null || request.getAmount() == null
                || request.getType() == null) {
            return ResponseEntity.badRequest().body("Missing required fields");
        }
        if (request.getAmount() <= 0) {
            return ResponseEntity.badRequest().body("Amount must be positive");
        }
        if (!request.getType().equals("withdraw") && !request.getType().equals("topup")) {
            return ResponseEntity.badRequest()
                    .body("Invalid transaction type. Only 'withdraw' and 'topup' accepted.");
        }

        
        // Only routing cards starting with '4' to System 2.
        if (request.getCardNumber().startsWith("4")) {
            try {
                org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
                headers.set("X-Source-System", "System1");
                org.springframework.http.HttpEntity<TransactionRequest> entity = new org.springframework.http.HttpEntity<>(
                        request, headers);

                return restTemplate.postForEntity(SYSTEM2_URL, entity, String.class);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error communicating with System 2: " + e.getMessage());
            }
        } else {
            return ResponseEntity.badRequest().body("Card range not supported. Only '4xxx' cards routed.");
        }
    }
}
