package mk.ukim.finki.nvd.backend.service.impl;

import lombok.AllArgsConstructor;
import mk.ukim.finki.nvd.backend.model.Product;
import mk.ukim.finki.nvd.backend.model.dto.ProductDto;
import mk.ukim.finki.nvd.backend.model.exceptions.ProductNotFoundException;
import mk.ukim.finki.nvd.backend.repository.ProductRepository;
import mk.ukim.finki.nvd.backend.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Page<Product> findAllWithPagination(Pageable pageable) {
        return this.productRepository.findAll(pageable);
    }

    @Override
    public Optional<Product> findById(Integer id) {
        return productRepository.findById(id);
    }

    @Override
    public Optional<Product> save(ProductDto dto) {
        Product product = new Product(dto.getTitle(), dto.getFullPrice(), dto.getDiscountPrice(), dto.getDescription(), dto.getDescriptionDetails(), dto.getWashingInstructions(), dto.getClothingCategory(), dto.getPersonCategory());
        return Optional.of(productRepository.save(product));
    }

    @Override
    public Optional<Product> edit(Integer id, ProductDto dto) {
        Product product = productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
        product.setTitle(dto.getTitle());
        product.setFullPrice(dto.getFullPrice());
        product.setDiscountPrice(dto.getDiscountPrice());
        product.setDescription(dto.getDescription());
        product.setDescriptionDetails(dto.getDescriptionDetails());
        product.setWashingInstructions(dto.getWashingInstructions());
        return Optional.of(productRepository.save(product));
    }

    @Override
    public void deleteById(Integer id) {
        productRepository.deleteById(id);
    }
}
