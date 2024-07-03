package mk.ukim.finki.nvd.backend.repository;

import mk.ukim.finki.nvd.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {

}
