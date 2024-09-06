package mk.ukim.finki.nvd.backend.service;

import mk.ukim.finki.nvd.backend.model.Product;
import mk.ukim.finki.nvd.backend.model.dto.ColorFilterDto;
import mk.ukim.finki.nvd.backend.model.dto.CustomFilterDto;
import mk.ukim.finki.nvd.backend.model.dto.PriceFilterDto;
import mk.ukim.finki.nvd.backend.model.dto.ProductDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> findAll();
    Page<Product> findAllWithPagination(Pageable pageable);
    Optional<Product> findById(Integer id);
    Optional<Product> save(ProductDto productDto);
    Optional<Product> edit(Integer id, ProductDto productDto);
    void deleteById(Integer id);
    List<String> findAllClothingCategoriesFor(String person);
    List<Product> filterByPerson(String person);
    List<Product> filterByPersonAndClothing(String person, String clothing);
    List<Product> filterByPrice(String person, String clothing, PriceFilterDto dto);
    List<Product> filterByColor(String person, String clothing, ColorFilterDto dto);
    List<Product> filterByCustom(String person, String clothing, CustomFilterDto dto);
    List<Product> searchProducts(String title, String description);
}
