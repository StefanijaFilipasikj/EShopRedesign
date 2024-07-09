package mk.ukim.finki.nvd.backend.web;

import lombok.AllArgsConstructor;
import mk.ukim.finki.nvd.backend.model.ProductColorOption;
import mk.ukim.finki.nvd.backend.service.ProductColorOptionService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/product-color-options")
@AllArgsConstructor
public class ProductColorOptionRestController {

    private final ProductColorOptionService colorOptionService;

    @GetMapping
    private List<ProductColorOption> findAll() {
        return this.colorOptionService.findAll();
    }
}
