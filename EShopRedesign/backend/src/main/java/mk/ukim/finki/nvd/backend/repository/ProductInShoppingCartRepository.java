package mk.ukim.finki.nvd.backend.repository;

import mk.ukim.finki.nvd.backend.model.ProductInShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductInShoppingCartRepository extends JpaRepository<ProductInShoppingCart, Integer> {

}
