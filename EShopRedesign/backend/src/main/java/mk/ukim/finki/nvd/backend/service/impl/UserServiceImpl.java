package mk.ukim.finki.nvd.backend.service.impl;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import mk.ukim.finki.nvd.backend.model.ShoppingCart;
import mk.ukim.finki.nvd.backend.model.User;
import mk.ukim.finki.nvd.backend.model.enumerations.Role;
import mk.ukim.finki.nvd.backend.model.exceptions.*;
import mk.ukim.finki.nvd.backend.repository.ShoppingCartRepository;
import mk.ukim.finki.nvd.backend.repository.UserRepository;
import mk.ukim.finki.nvd.backend.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ShoppingCartRepository shoppingCartRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public User findByUsername(String username) {
        return this.userRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundException(username));
    }

    @Override
    public Optional<User> login(String username, String password) {
        if (username == null || username.isEmpty() || password == null || password.isEmpty()) {
            throw new InvalidArgumentsException();
        }
        return userRepository.findByUsernameAndPassword(username, password);
    }

    @Override
    public User register(String username, String password, String repeatPassword, Role userRole) {
        if (username == null || username.isEmpty() || password == null || password.isEmpty())
            throw new InvalidUsernameOrPasswordException();
        if (!password.equals(repeatPassword))
            throw new PasswordsDoNotMatchException();
        if (this.userRepository.findByUsername(username).isPresent())
            throw new UsernameAlreadyExistsException(username);
        ShoppingCart sc = this.shoppingCartRepository.save(new ShoppingCart());
        User user = new User(username, passwordEncoder.encode(password), userRole, sc);
        return userRepository.save(user);
    }
}
