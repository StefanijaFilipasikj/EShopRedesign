package mk.ukim.finki.nvd.backend.service;

import mk.ukim.finki.nvd.backend.model.User;
import mk.ukim.finki.nvd.backend.model.enumerations.Role;

import java.util.Optional;

public interface UserService {
    public User findByUsername(String username);
    Optional<User> login(String username, String password);
    User register(String username, String password, String repeatPassword, Role role);
}
