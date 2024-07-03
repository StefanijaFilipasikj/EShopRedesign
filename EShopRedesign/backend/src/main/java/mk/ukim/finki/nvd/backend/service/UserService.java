package mk.ukim.finki.nvd.backend.service;

import mk.ukim.finki.nvd.backend.model.User;

public interface UserService {
    public User findByUsername(String username);
}
