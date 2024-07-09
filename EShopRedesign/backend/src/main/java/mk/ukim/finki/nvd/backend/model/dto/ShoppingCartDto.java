package mk.ukim.finki.nvd.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShoppingCartDto {
    private Integer id;
    private List<ProductInShoppingCartDto> products;
}
