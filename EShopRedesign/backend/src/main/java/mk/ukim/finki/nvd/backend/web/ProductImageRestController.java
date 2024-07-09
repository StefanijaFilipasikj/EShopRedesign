package mk.ukim.finki.nvd.backend.web;

import lombok.AllArgsConstructor;
import mk.ukim.finki.nvd.backend.model.ProductImage;
import mk.ukim.finki.nvd.backend.service.ProductImageService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/product-images")
@AllArgsConstructor
public class ProductImageRestController {

    private final ProductImageService imageService;

    @GetMapping
    private List<ProductImage> findAll() {
        return this.imageService.findAll();
    }
}
