package com.email.writer.Controllers;

import com.email.writer.Entities.User;
import com.email.writer.Models.LoginRequest;
import com.email.writer.Repositories.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174" }, allowCredentials = "true")
public class AuthController {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

  @Value("${google.client.id}")
  private String googleClientId;

  @PostMapping("/signup")
  public ResponseEntity<?> signup(@RequestBody User user) {
    if (userRepository.findByEmail(user.getEmail()).isPresent()) {
      return ResponseEntity.badRequest().body("Email already exists");
    }
    // Encode password before saving
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    return ResponseEntity.ok(userRepository.save(user));
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());

    if (userOpt.isPresent()) {
      User user = userOpt.get();
      String storedPassword = user.getPassword();
      String rawPassword = loginRequest.getPassword();

      // Primary check: BCrypt match (for properly hashed passwords)
      boolean matches = passwordEncoder.matches(rawPassword, storedPassword);

      // Migration fallback: password was stored as plain-text before BCrypt was enforced
      if (!matches && rawPassword.equals(storedPassword)) {
        // Silently re-hash and save so future logins use BCrypt
        user.setPassword(passwordEncoder.encode(rawPassword));
        userRepository.save(user);
        System.out.println(">>> P2B System: Migrated plain-text password to BCrypt for: " + user.getEmail());
        matches = true;
      }

      if (matches) {
        return ResponseEntity.ok(user);
      }
    }
    return ResponseEntity.status(401).body("Invalid email or password");
  }


  @PostMapping("/google")
  public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> body) {
    String idTokenString = body.get("idToken");
    if (idTokenString == null) {
      return ResponseEntity.badRequest().body("Token is required");
    }

    try {
      GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
          .setAudience(Collections.singletonList(googleClientId))
          .build();

      GoogleIdToken idToken = verifier.verify(idTokenString);
      if (idToken != null) {
        GoogleIdToken.Payload payload = idToken.getPayload();
        String email = payload.getEmail();
        String name = (String) payload.get("name");

        Optional<User> userOpt = userRepository.findByEmail(email);
        User user;
        if (userOpt.isPresent()) {
          user = userOpt.get();
        } else {
          user = new User();
          user.setEmail(email);
          user.setFullName(name);
          user.setPassword("GOOGLE_OAUTH_USER");
          user = userRepository.save(user);
        }
        return ResponseEntity.ok(user);
      } else {
        return ResponseEntity.status(401).body("Invalid ID token");
      }
    } catch (Exception e) {
      return ResponseEntity.status(500).body("Error verifying token: " + e.getMessage());
    }
  }
}
