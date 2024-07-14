package mk.ukim.finki.nvd.backend.repository;

import mk.ukim.finki.nvd.backend.model.Color;
import mk.ukim.finki.nvd.backend.model.ProductColorOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductColorOptionRepository extends JpaRepository<ProductColorOption, Integer> {
    List<ProductColorOption> findByColor(Color color);
}
