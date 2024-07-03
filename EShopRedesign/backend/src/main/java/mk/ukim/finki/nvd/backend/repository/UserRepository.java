package mk.ukim.finki.nvd.backend.repository;

import mk.ukim.finki.nvd.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    User findByUsername(String username);
}
