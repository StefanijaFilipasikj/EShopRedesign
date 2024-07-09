package mk.ukim.finki.nvd.backend.service;

import mk.ukim.finki.nvd.backend.model.ProductColorOption;
import mk.ukim.finki.nvd.backend.model.dto.ProductColorOptionDto;

import java.util.List;
import java.util.Optional;

public interface ProductColorOptionService {
    List<ProductColorOption> findAll();
    Optional<ProductColorOption> findById(Integer id);
    Optional<ProductColorOption> save(ProductColorOptionDto dto);
    Optional<ProductColorOption> edit(Integer id, ProductColorOptionDto dto);
    void deleteById(Integer id);
}
