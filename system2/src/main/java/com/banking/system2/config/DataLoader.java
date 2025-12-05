package com.banking.system2.config;

import com.banking.system2.entity.Card;
import com.banking.system2.entity.User;
import com.banking.system2.repository.CardRepository;
import com.banking.system2.repository.UserRepository;
import com.banking.system2.util.HashUtil;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(CardRepository cardRepository, UserRepository userRepository) {
        return args -> {
            // Create Users
            // Customer: nikhil / nikhil@123
            if (!userRepository.existsById("nikhil")) {
                userRepository.save(new User("nikhil", HashUtil.hashPin("nikhil@123"), "CUSTOMER"));
            }

            // Super Admin: admin / admin@123
            if (!userRepository.existsById("admin")) {
                userRepository.save(new User("admin", HashUtil.hashPin("admin@123"), "ADMIN"));
            }

            System.out.println("Sample data loaded: Users (nikhil, admin)");
        };
    }
}
