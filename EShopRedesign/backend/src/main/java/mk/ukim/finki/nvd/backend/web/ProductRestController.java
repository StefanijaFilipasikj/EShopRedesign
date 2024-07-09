package mk.ukim.finki.nvd.backend.web;

import lombok.AllArgsConstructor;
import mk.ukim.finki.nvd.backend.model.Product;
import mk.ukim.finki.nvd.backend.model.dto.ProductDto;
import mk.ukim.finki.nvd.backend.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/products")
@AllArgsConstructor
public class ProductRestController {

    private final ProductService productService;

    @GetMapping
    private List<Product> findAll() {
        return this.productService.findAll();
    }

    @GetMapping("/pagination")
    public List<Product> findAllWithPagination(Pageable pageable){
        return this.productService.findAllWithPagination(pageable).getContent();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> findById(@PathVariable Integer id) {
        return this.productService.findById(id)
                .map(product -> ResponseEntity.ok().body(product))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<Product> save(@RequestBody ProductDto productDto) {
        return this.productService.save(productDto)
                .map(product -> ResponseEntity.ok().body(product))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Product> save(@PathVariable Integer id, @RequestBody ProductDto productDto) {
        return this.productService.edit(id, productDto)
                .map(product -> ResponseEntity.ok().body(product))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteById(@PathVariable Integer id) {
        this.productService.deleteById(id);
        if(this.productService.findById(id).isEmpty()) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }
}
