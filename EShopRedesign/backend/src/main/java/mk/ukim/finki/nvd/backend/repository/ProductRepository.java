package mk.ukim.finki.nvd.backend.repository;

import jakarta.annotation.Nullable;
import mk.ukim.finki.nvd.backend.model.Product;
import mk.ukim.finki.nvd.backend.model.enumerations.ClothingCategory;
import mk.ukim.finki.nvd.backend.model.enumerations.PersonCategory;
import mk.ukim.finki.nvd.backend.model.enumerations.details.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    Page<Product> findAll(Pageable pageable);
    List<Product> findByFullPriceBetween(Double min, Double max);
    List<Product> findByPersonCategoryAndClothingCategoryAndFullPriceBetween(PersonCategory p, ClothingCategory c, Double min, Double max);
    List<Product> findByPersonCategoryAndFullPriceBetween(PersonCategory p, Double min, Double max);
    List<Product> findByClothingCategoryAndFullPriceBetween(ClothingCategory c, Double min, Double max);
    List<Product> findByPersonCategory(PersonCategory p);
    List<Product> findByClothingCategory(ClothingCategory c);
    List<Product> findByPersonCategoryAndClothingCategory(PersonCategory p, ClothingCategory c);
    List<Product> findByPersonCategoryAndClothingCategoryAndDetails_LengthAndDetails_SleevesAndDetails_NecklineAndDetails_WaistAndDetails_Fit(PersonCategory p, ClothingCategory c, @Nullable Length l, @Nullable Sleeves s, @Nullable Neckline n, @Nullable Waist w, @Nullable Fit f);

}
