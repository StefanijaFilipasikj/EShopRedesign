package mk.ukim.finki.nvd.backend.web;

import lombok.AllArgsConstructor;
import mk.ukim.finki.nvd.backend.model.dto.ProductToCartDto;
import mk.ukim.finki.nvd.backend.model.dto.ShoppingCartDto;
import mk.ukim.finki.nvd.backend.service.ShoppingCartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/shopping-cart")
@AllArgsConstructor
public class ShoppingCartRestController {

    private final ShoppingCartService shoppingCartService;

    @GetMapping("/{username}")
    public ResponseEntity<ShoppingCartDto> findByUsername(@PathVariable String username) {
        return this.shoppingCartService.getShoppingCartByUsername(username)
                .map(cart -> ResponseEntity.ok().body(cart))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add-product")
    public ResponseEntity<ShoppingCartDto> addProductToShoppingCart(@RequestBody ProductToCartDto dto){
        return this.shoppingCartService.addProductToShoppingCart(dto)
                .map(cart -> ResponseEntity.ok().body(cart))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PutMapping("/edit-product/{id}")
    public ResponseEntity<ShoppingCartDto> editProductInShoppingCart(@PathVariable Integer id, @RequestBody ProductToCartDto dto){
        return this.shoppingCartService.editProductInShoppingCart(id, dto)
                .map(cart -> ResponseEntity.ok().body(cart))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/remove-product/{id}")
    public ResponseEntity<ShoppingCartDto> removeProductFromShoppingCart(@PathVariable Integer id){
        return this.shoppingCartService.removeProductFromCart(id)
                .map(cart -> ResponseEntity.ok().body(cart))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/clear/{username}")
    public ResponseEntity<Void> clearShoppingCart(@PathVariable String username) {
        try {
            shoppingCartService.clearShoppingCart(username);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
