package mk.ukim.finki.nvd.backend.service;

import mk.ukim.finki.nvd.backend.model.dto.ProductToCartDto;
import mk.ukim.finki.nvd.backend.model.dto.ShoppingCartDto;

import java.util.Optional;

public interface ShoppingCartService {
    Optional<ShoppingCartDto> getShoppingCartByUsername(String username);
    Optional<ShoppingCartDto> addProductToShoppingCart(ProductToCartDto dto);
    Optional<ShoppingCartDto> editProductInShoppingCart(Integer id, ProductToCartDto dto);
    Optional<ShoppingCartDto> removeProductFromCart(Integer id);
}
