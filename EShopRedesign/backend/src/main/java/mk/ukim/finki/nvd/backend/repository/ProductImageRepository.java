package mk.ukim.finki.nvd.backend.repository;

import mk.ukim.finki.nvd.backend.model.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductImageRepository extends JpaRepository<ProductImage, Integer> {

}
