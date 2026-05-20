package com.email.writer.Repositories;

import com.email.writer.Entities.P2BUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface P2BUserRepository extends JpaRepository<P2BUser, Long> {
  Optional<P2BUser> findByEmail(String email);
}
