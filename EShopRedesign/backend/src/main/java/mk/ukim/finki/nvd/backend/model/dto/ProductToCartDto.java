package mk.ukim.finki.nvd.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.nvd.backend.model.enumerations.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductToCartDto {
    private String username;
    private Integer productId;
    private Integer colorOptionId;
    private Integer quantity;
    private Size size;
}
