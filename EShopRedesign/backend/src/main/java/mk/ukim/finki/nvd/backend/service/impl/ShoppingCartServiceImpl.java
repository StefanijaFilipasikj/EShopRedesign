package mk.ukim.finki.nvd.backend.service.impl;


import mk.ukim.finki.nvd.backend.model.Product;
import mk.ukim.finki.nvd.backend.model.ShoppingCart;
import mk.ukim.finki.nvd.backend.model.exceptions.ProductAlreadyInShoppingCartException;
import mk.ukim.finki.nvd.backend.model.exceptions.ProductNotFoundException;
import mk.ukim.finki.nvd.backend.model.exceptions.ShoppingCartNotFoundException;
import mk.ukim.finki.nvd.backend.repository.ShoppingCartRepository;
import mk.ukim.finki.nvd.backend.service.ProductService;
import mk.ukim.finki.nvd.backend.service.ShoppingCartService;
import mk.ukim.finki.nvd.backend.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShoppingCartServiceImpl implements ShoppingCartService {

    private final ShoppingCartRepository shoppingCartRepository;
    private final ProductService productService;
    private final UserService userService;

    public ShoppingCartServiceImpl(ShoppingCartRepository shoppingCartRepository, ProductService productService, UserService userService) {
        this.shoppingCartRepository = shoppingCartRepository;
        this.productService = productService;
        this.userService = userService;
    }

    @Override
    public List<Product> listAllProductsInShoppingCart(Long cartId) {
        return shoppingCartRepository.findById(cartId).orElseThrow(() -> new ShoppingCartNotFoundException(cartId)).getProducts();
    }

    @Override
    public ShoppingCart addProductToShoppingCart(String username, Integer productId) {
        ShoppingCart shoppingCart = userService.findByUsername(username).getShoppingCart();
        Product product = productService.findById(productId).orElseThrow(() -> new ProductNotFoundException(productId));
        if (shoppingCart.getProducts()
                .stream().filter(i -> i.getId().equals(productId)).toList().size() > 0)
            throw new ProductAlreadyInShoppingCartException(productId, username);
        shoppingCart.getProducts().add(product);
        return shoppingCartRepository.save(shoppingCart);
    }
}
