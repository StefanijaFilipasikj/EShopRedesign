package mk.ukim.finki.nvd.backend.service;

import mk.ukim.finki.nvd.backend.model.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> findAll();
    Optional<Product> findById(Integer id);
    Optional<Product> save(String title, Double fullPrice, Double discountPrice, String description, String description_details, String washing_instructions);
    Optional<Product> edit(Integer id,String title, Double fullPrice, Double discountPrice, String description, String description_details, String washing_instructions);
    void deleteById(Integer id);
}
