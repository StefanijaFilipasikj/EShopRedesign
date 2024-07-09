package mk.ukim.finki.nvd.backend.service.impl;

import lombok.AllArgsConstructor;
import mk.ukim.finki.nvd.backend.model.ProductColorOption;
import mk.ukim.finki.nvd.backend.model.ProductImage;
import mk.ukim.finki.nvd.backend.model.dto.ProductImageDto;
import mk.ukim.finki.nvd.backend.model.exceptions.ProductColorOptionNotFoundException;
import mk.ukim.finki.nvd.backend.model.exceptions.ProductImageNotFoundException;
import mk.ukim.finki.nvd.backend.repository.ProductImageRepository;
import mk.ukim.finki.nvd.backend.service.ProductColorOptionService;
import mk.ukim.finki.nvd.backend.service.ProductImageService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductImageServiceImpl implements ProductImageService {

    private final ProductImageRepository productImageRepository;
    private final ProductColorOptionService productColorOptionService;

    @Override
    public List<ProductImage> findAll() {
        return productImageRepository.findAll();
    }

    @Override
    public Optional<ProductImage> findById(Integer id) {
        return productImageRepository.findById(id);
    }

    @Override
    public Optional<ProductImage> save(ProductImageDto dto) {
        ProductColorOption colorOption = productColorOptionService.findById(dto.getColorOptionId()).orElseThrow(() -> new ProductColorOptionNotFoundException(dto.getColorOptionId()));
        ProductImage productImage = new ProductImage(colorOption, dto.getImageUrl());
        return Optional.of(productImageRepository.save(productImage));
    }

    @Override
    public Optional<ProductImage> edit(Integer id, ProductImageDto dto) {
        ProductColorOption colorOption = productColorOptionService.findById(dto.getColorOptionId()).orElseThrow(() -> new ProductColorOptionNotFoundException(dto.getColorOptionId()));
        ProductImage image = productImageRepository.findById(id).orElseThrow(() -> new ProductImageNotFoundException(id));
        image.setColorOption(colorOption);
        image.setImageUrl(dto.getImageUrl());
        return Optional.of(productImageRepository.save(image));
    }

    @Override
    public void deleteById(Integer id) {
        productImageRepository.deleteById(id);
    }
}
