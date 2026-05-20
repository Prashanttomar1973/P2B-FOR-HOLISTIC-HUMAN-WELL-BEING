package com.email.writer.Config;

import com.email.writer.Entities.User;
import com.email.writer.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        String defaultEmail = "user@p2b.ai";
        String defaultPassword = "p2b123";

        Optional<User> userOpt = userRepository.findByEmail(defaultEmail);

        if (userOpt.isEmpty()) {
            User defaultUser = new User();
            defaultUser.setEmail(defaultEmail);
            defaultUser.setFullName("P2B Default User");
            defaultUser.setPassword(passwordEncoder.encode(defaultPassword));
            userRepository.save(defaultUser);
            System.out.println(">>> P2B System: Default user created successfully.");
        } else {
            User existingUser = userOpt.get();
            // If the password isn't matched with the default, update it (as per dev fallback needs)
            if (!passwordEncoder.matches(defaultPassword, existingUser.getPassword())) {
                existingUser.setPassword(passwordEncoder.encode(defaultPassword));
                userRepository.save(existingUser);
                System.out.println(">>> P2B System: Default user password synchronized.");
            }
        }
    }
}
