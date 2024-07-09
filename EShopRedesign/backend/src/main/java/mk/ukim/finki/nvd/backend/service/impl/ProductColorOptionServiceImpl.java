package mk.ukim.finki.nvd.backend.service.impl;

import lombok.AllArgsConstructor;
import mk.ukim.finki.nvd.backend.model.Product;
import mk.ukim.finki.nvd.backend.model.ProductColorOption;
import mk.ukim.finki.nvd.backend.model.dto.ProductColorOptionDto;
import mk.ukim.finki.nvd.backend.model.exceptions.ProductColorOptionNotFoundException;
import mk.ukim.finki.nvd.backend.model.exceptions.ProductNotFoundException;
import mk.ukim.finki.nvd.backend.repository.ProductColorOptionRepository;
import mk.ukim.finki.nvd.backend.service.ProductColorOptionService;
import mk.ukim.finki.nvd.backend.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductColorOptionServiceImpl implements ProductColorOptionService {

    private final ProductColorOptionRepository productColorOptionRepository;
    private final ProductService productService;

    @Override
    public List<ProductColorOption> findAll() {
        return productColorOptionRepository.findAll();
    }

    @Override
    public Optional<ProductColorOption> findById(Integer id) {
        return productColorOptionRepository.findById(id);
    }

    @Override
    public Optional<ProductColorOption> save(ProductColorOptionDto dto) {
        Product product = productService.findById(dto.getProductId()).orElseThrow(() -> new ProductNotFoundException(dto.getProductId()));
        ProductColorOption productColorOption = new ProductColorOption(product, dto.getCode(), dto.getColor(), dto.getThumbnailUrl(), dto.getModelSize());
        return Optional.of(productColorOptionRepository.save(productColorOption));
    }

    @Override
    public Optional<ProductColorOption> edit(Integer id, ProductColorOptionDto dto) {
        Product product = productService.findById(dto.getProductId()).orElseThrow(() -> new ProductNotFoundException(dto.getProductId()));
        ProductColorOption productColorOption = productColorOptionRepository.findById(id).orElseThrow(() -> new ProductColorOptionNotFoundException(id));
        productColorOption.setProduct(product);
        productColorOption.setCode(dto.getCode());
        productColorOption.setColor(dto.getColor());
        productColorOption.setThumbnailUrl(dto.getThumbnailUrl());
        productColorOption.setModelSize(dto.getModelSize());
        return Optional.of(productColorOptionRepository.save(productColorOption));
    }

    @Override
    public void deleteById(Integer id) {
        productColorOptionRepository.deleteById(id);
    }
}
