package com.email.writer;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import com.email.writer.Entities.User;
import com.email.writer.Repositories.UserRepository;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.email.writer")
@EnableMongoRepositories(basePackages = "com.email.writer")
public class P2BApplication {
	public static void main(String[] args) {
		SpringApplication.run(P2BApplication.class, args);

		System.out.println("=========================================");
		System.out.println("P2B Universal 3.0 Engine is LIVE!");
		System.out.println("Connected to PostgreSQL (Reports)");
		System.out.println("Connected to MongoDB (Chat History)");
		System.out.println("AI Engine: Groq Llama-3.3");
		System.out.println("=========================================");
	}

	@Bean
	public CommandLineRunner seedUser(UserRepository userRepository) {
		return args -> {
			if (userRepository.count() == 0) {
				User user = new User();
				user.setEmail("user@p2b.ai");
				user.setPassword("p2b123");
				user.setFullName("P2B Explorer");
				userRepository.save(user);
				System.out.println("SEED_INIT: Default user created (user@p2b.ai / p2b123)");
			}
		};
	}
}