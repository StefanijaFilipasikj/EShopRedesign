package mk.ukim.finki.nvd.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomFilterDto {
    private String length;
    private String sleeves;
    private String neckline;
    private String waist;
    private String fit;
}
