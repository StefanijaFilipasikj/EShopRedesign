package mk.ukim.finki.nvd.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
public class ShoppingCart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @OneToMany(mappedBy = "shoppingCart")
    private List<ProductInShoppingCart> products;

    public ShoppingCart() {
        this.products = new ArrayList<>();
    }
}
