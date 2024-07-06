package mk.ukim.finki.nvd.backend.service.impl;


import mk.ukim.finki.nvd.backend.model.Product;
import mk.ukim.finki.nvd.backend.model.ProductColorOption;
import mk.ukim.finki.nvd.backend.model.exceptions.ProductColorOptionNotFoundException;
import mk.ukim.finki.nvd.backend.model.exceptions.ProductNotFoundException;
import mk.ukim.finki.nvd.backend.repository.ProductColorOptionRepository;
import mk.ukim.finki.nvd.backend.service.ProductColorOptionService;
import mk.ukim.finki.nvd.backend.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductColorOptionServiceImpl implements ProductColorOptionService {

    private final ProductColorOptionRepository productColorOptionRepository;
    private final ProductService productService;

    public ProductColorOptionServiceImpl(ProductColorOptionRepository productColorOptionRepository, ProductService productService) {
        this.productColorOptionRepository = productColorOptionRepository;
        this.productService = productService;
    }

    @Override
    public List<ProductColorOption> findAll() {
        return productColorOptionRepository.findAll();
    }

    @Override
    public Optional<ProductColorOption> findById(Integer id) {
        return productColorOptionRepository.findById(id);
    }

    @Override
    public Optional<ProductColorOption> save(Integer productId, String code, String color, String thumbnailUrl, String modelSize) {
        Product product = productService.findById(productId).orElseThrow(() -> new ProductNotFoundException(productId));
        ProductColorOption productColorOption = new ProductColorOption(product, code, color, thumbnailUrl, modelSize);
        return Optional.of(productColorOptionRepository.save(productColorOption));
    }

    @Override
    public Optional<ProductColorOption> edit(Integer id, Integer productId, String code, String color, String thumbnailUrl, String modelSize) {
        Product product = productService.findById(productId).orElseThrow(() -> new ProductNotFoundException(productId));
        ProductColorOption productColorOption = productColorOptionRepository.findById(id).orElseThrow(() -> new ProductColorOptionNotFoundException(id));
        productColorOption.setProduct(product);
        productColorOption.setCode(code);
        productColorOption.setColor(color);
        productColorOption.setColor(thumbnailUrl);
        productColorOption.setColor(modelSize);
        return Optional.of(productColorOptionRepository.save(productColorOption));
    }

    @Override
    public void deleteById(Integer id) {
        productColorOptionRepository.deleteById(id);
    }
}
