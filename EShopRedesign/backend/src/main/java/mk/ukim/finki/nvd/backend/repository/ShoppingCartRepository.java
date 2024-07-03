package mk.ukim.finki.nvd.backend.repository;

import mk.ukim.finki.nvd.backend.model.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {
}
