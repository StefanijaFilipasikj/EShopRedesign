package mk.ukim.finki.nvd.backend.service.impl;


import mk.ukim.finki.nvd.backend.model.ProductColorOption;
import mk.ukim.finki.nvd.backend.model.ProductImage;
import mk.ukim.finki.nvd.backend.model.exceptions.ProductColorOptionNotFoundException;
import mk.ukim.finki.nvd.backend.model.exceptions.ProductImageNotFoundException;
import mk.ukim.finki.nvd.backend.repository.ProductImageRepository;
import mk.ukim.finki.nvd.backend.service.ProductColorOptionService;
import mk.ukim.finki.nvd.backend.service.ProductImageService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductImageServiceImpl implements ProductImageService {

    private final ProductImageRepository productImageRepository;
    private final ProductColorOptionService productColorOptionService;

    public ProductImageServiceImpl(ProductImageRepository productImageRepository, ProductColorOptionService productColorOptionService) {
        this.productImageRepository = productImageRepository;
        this.productColorOptionService = productColorOptionService;
    }

    @Override
    public List<ProductImage> findAll() {
        return productImageRepository.findAll();
    }

    @Override
    public Optional<ProductImage> findById(Integer id) {
        return productImageRepository.findById(id);
    }

    @Override
    public Optional<ProductImage> save(Integer colorOptionId, String imageUrl) {
        ProductColorOption colorOption = productColorOptionService.findById(colorOptionId).orElseThrow(() -> new ProductColorOptionNotFoundException(colorOptionId));
        ProductImage productImage = new ProductImage(colorOption, imageUrl);
        return Optional.of(productImageRepository.save(productImage));
    }

    @Override
    public Optional<ProductImage> edit(Integer id, Integer colorOptionId, String imageUrl) {
        ProductColorOption colorOption = productColorOptionService.findById(colorOptionId).orElseThrow(() -> new ProductColorOptionNotFoundException(colorOptionId));
        ProductImage image = productImageRepository.findById(id).orElseThrow(() -> new ProductImageNotFoundException(id));
        image.setColorOption(colorOption);
        image.setImageUrl(imageUrl);
        return Optional.of(productImageRepository.save(image));
    }

    @Override
    public void deleteById(Integer id) {
        productImageRepository.deleteById(id);
    }
}
