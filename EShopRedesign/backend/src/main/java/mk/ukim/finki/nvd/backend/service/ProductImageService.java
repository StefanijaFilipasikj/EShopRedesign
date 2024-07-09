package mk.ukim.finki.nvd.backend.service;

import mk.ukim.finki.nvd.backend.model.ProductImage;
import mk.ukim.finki.nvd.backend.model.dto.ProductImageDto;

import java.util.List;
import java.util.Optional;

public interface ProductImageService {
    List<ProductImage> findAll();
    Optional<ProductImage> findById(Integer id);
    Optional<ProductImage> save(ProductImageDto productImageDto);
    Optional<ProductImage> edit(Integer id, ProductImageDto productImageDto);
    void deleteById(Integer id);
}
