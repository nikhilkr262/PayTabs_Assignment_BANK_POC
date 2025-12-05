package com.banking.system2.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Card {
    @Id
    private String cardNumber;
    private String pinHash;
    private Double balance;
    private String username;

    public Card() {
    }

    public Card(String cardNumber, String pinHash, Double balance, String username) {
        this.cardNumber = cardNumber;
        this.pinHash = pinHash;
        this.balance = balance;
        this.username = username;
    }

    // Getters and Setters
    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getPinHash() {
        return pinHash;
    }

    public void setPinHash(String pinHash) {
        this.pinHash = pinHash;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
