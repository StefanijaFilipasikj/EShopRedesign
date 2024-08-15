package mk.ukim.finki.nvd.backend.service;

import mk.ukim.finki.nvd.backend.model.User;
import mk.ukim.finki.nvd.backend.model.dto.UserFormDto;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface UserService extends UserDetailsService {
    User findByUsername(String username);
    Optional<User> login(String username, String password);
    Optional<User> register(UserFormDto dto);
}
