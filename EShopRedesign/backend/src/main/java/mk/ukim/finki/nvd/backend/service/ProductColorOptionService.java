package mk.ukim.finki.nvd.backend.service;

import mk.ukim.finki.nvd.backend.model.ProductColorOption;

import java.util.List;
import java.util.Optional;

public interface ProductColorOptionService {
    List<ProductColorOption> findAll();
    Optional<ProductColorOption> findById(Integer id);
    Optional<ProductColorOption> save(Integer productId, String code, String color, String thumbnailUrl, String modelSize);
    Optional<ProductColorOption> edit(Integer id,Integer productId, String code, String color, String thumbnailUrl, String modelSize);
    void deleteById(Integer id);
}
