package mk.ukim.finki.nvd.backend.model.dto;

import lombok.Data;
import mk.ukim.finki.nvd.backend.model.User;
import mk.ukim.finki.nvd.backend.model.enumerations.Role;

@Data
public class UserDetailsDto {
    private String username;
    private Role role;

    public static UserDetailsDto of(User user){
        UserDetailsDto details = new UserDetailsDto();
        details.username = user.getUsername();
        details.role = user.getRole();
        return details;
    }
}