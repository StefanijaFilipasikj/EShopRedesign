package mk.ukim.finki.nvd.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.nvd.backend.model.enumerations.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductInShoppingCartDto {
    private Integer id;
    private ProductDto product;
    private ProductColorOptionDto colorOption;
    private Integer quantity;
    private Size size;
}
