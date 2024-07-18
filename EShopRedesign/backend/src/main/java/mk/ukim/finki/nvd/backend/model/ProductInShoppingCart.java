package mk.ukim.finki.nvd.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.nvd.backend.model.enumerations.Size;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductInShoppingCart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    private Product product;
    @ManyToOne
    private ProductColorOption colorOption;
    @ManyToOne
    private ShoppingCart shoppingCart;
    private Integer quantity;
    @Enumerated(EnumType.STRING)
    private Size size;


    public ProductInShoppingCart(Product product, ProductColorOption colorOption, ShoppingCart shoppingCart, Integer quantity, Size size) {
        this.product = product;
        this.colorOption = colorOption;
        this.shoppingCart = shoppingCart;
        this.quantity = quantity;
        this.size = size;
    }
}
