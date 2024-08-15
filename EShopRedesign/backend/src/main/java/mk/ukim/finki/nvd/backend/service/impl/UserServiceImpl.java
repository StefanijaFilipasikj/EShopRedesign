package mk.ukim.finki.nvd.backend.service.impl;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import mk.ukim.finki.nvd.backend.model.ShoppingCart;
import mk.ukim.finki.nvd.backend.model.User;
import mk.ukim.finki.nvd.backend.model.dto.UserFormDto;
import mk.ukim.finki.nvd.backend.model.exceptions.*;
import mk.ukim.finki.nvd.backend.repository.ShoppingCartRepository;
import mk.ukim.finki.nvd.backend.repository.UserRepository;
import mk.ukim.finki.nvd.backend.service.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
    public Optional<User> register(UserFormDto dto) {
        if (dto.getUsername() == null || dto.getUsername().isEmpty() || dto.getPassword() == null || dto.getPassword().isEmpty())
            throw new InvalidUsernameOrPasswordException();
        if (!dto.getPassword().equals(dto.getRepeatPassword()))
            throw new PasswordsDoNotMatchException();
        if (this.userRepository.findByUsername(dto.getUsername()).isPresent())
            throw new UsernameAlreadyExistsException(dto.getUsername());
        ShoppingCart sc = this.shoppingCartRepository.save(new ShoppingCart());
        User user = new User(dto.getUsername(), passwordEncoder.encode(dto.getPassword()), dto.getRole(), sc);
        return Optional.of(userRepository.save(user));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username));
    }
}