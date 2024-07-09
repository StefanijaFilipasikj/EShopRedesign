package mk.ukim.finki.nvd.backend.service;

import mk.ukim.finki.nvd.backend.model.Product;
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
}
