package mk.ukim.finki.nvd.backend.service;

import mk.ukim.finki.nvd.backend.model.ProductImage;

import java.util.List;
import java.util.Optional;

public interface ProductImageService {
    List<ProductImage> findAll();
    Optional<ProductImage> findById(Integer id);
    Optional<ProductImage> save(Integer colorOptionId, String imageUrl);
    Optional<ProductImage> edit(Integer id,Integer colorOptionId, String imageUrl);
    void deleteById(Integer id);
}
