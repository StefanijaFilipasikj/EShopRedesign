package mk.ukim.finki.nvd.backend.service.impl;


import mk.ukim.finki.nvd.backend.model.Product;
import mk.ukim.finki.nvd.backend.model.exceptions.ProductNotFoundException;
import mk.ukim.finki.nvd.backend.repository.ProductRepository;
import mk.ukim.finki.nvd.backend.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> findById(Integer id) {
        return productRepository.findById(id);
    }

    @Override
    public Optional<Product> save(String title, Double fullPrice, Double discountPrice, String description, String description_details, String washing_instructions) {
        Product product = new Product(title,fullPrice,discountPrice,description,description_details,washing_instructions);
        return Optional.of(productRepository.save(product));
    }

    @Override
    public Optional<Product> edit(Integer id, String title, Double fullPrice, Double discountPrice, String description, String description_details, String washing_instructions) {
        Product product = productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
        product.setTitle(title);
        product.setFullPrice(fullPrice);
        product.setDiscountPrice(discountPrice);
        product.setDescription(description);
        product.setDescription_details(description_details);
        product.setWashing_instructions(washing_instructions);
        return Optional.of(productRepository.save(product));
    }

    @Override
    public void deleteById(Integer id) {
        productRepository.deleteById(id);
    }
}
