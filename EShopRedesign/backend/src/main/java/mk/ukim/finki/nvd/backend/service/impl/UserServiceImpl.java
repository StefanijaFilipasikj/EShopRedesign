package mk.ukim.finki.nvd.backend.service.impl;

import mk.ukim.finki.nvd.backend.model.User;
import mk.ukim.finki.nvd.backend.repository.UserRepository;
import mk.ukim.finki.nvd.backend.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User findByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }
}
