package mk.ukim.finki.nvd.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductImageDto {
    private Integer colorOptionId;
    private String imageUrl;
}
