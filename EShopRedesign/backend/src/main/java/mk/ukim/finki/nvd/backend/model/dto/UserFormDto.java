package mk.ukim.finki.nvd.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.nvd.backend.model.enumerations.Role;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserFormDto {
    private String username;
    private String password;
    private String repeatPassword;
    private Role role;
}