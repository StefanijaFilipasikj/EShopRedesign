package mk.ukim.finki.nvd.backend.service.impl;

import lombok.AllArgsConstructor;
import mk.ukim.finki.nvd.backend.model.Product;
import mk.ukim.finki.nvd.backend.model.ProductColorOption;
import mk.ukim.finki.nvd.backend.model.ProductInShoppingCart;
import mk.ukim.finki.nvd.backend.model.ShoppingCart;
import mk.ukim.finki.nvd.backend.model.dto.*;
import mk.ukim.finki.nvd.backend.model.exceptions.*;
import mk.ukim.finki.nvd.backend.repository.ProductInShoppingCartRepository;
import mk.ukim.finki.nvd.backend.repository.ShoppingCartRepository;
import mk.ukim.finki.nvd.backend.service.ProductColorOptionService;
import mk.ukim.finki.nvd.backend.service.ProductService;
import mk.ukim.finki.nvd.backend.service.ShoppingCartService;
import mk.ukim.finki.nvd.backend.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ShoppingCartServiceImpl implements ShoppingCartService {

    private final ProductInShoppingCartRepository productInShoppingCartRepository;
    private final ProductColorOptionService productColorOptionService;
    private final ProductService productService;
    private final UserService userService;
    private final ShoppingCartRepository shoppingCartRepository;

    // Dto is used to avoid loops
    // getShoppingCartDto method is defined bellow
    @Override
    public Optional<ShoppingCartDto> getShoppingCartByUsername (String username) {
        return this.getShoppingCartDto(this.userService.findByUsername(username).getShoppingCart());
    }

    @Override
    public Optional<ShoppingCartDto> addProductToShoppingCart(ProductToCartDto dto) {
        ShoppingCart shoppingCart = userService.findByUsername(dto.getUsername()).getShoppingCart();
        Product product = productService.findById(dto.getProductId()).orElseThrow(() -> new ProductNotFoundException(dto.getProductId()));
        ProductColorOption productColorOption = productColorOptionService.findById(dto.getColorOptionId()).orElseThrow(() -> new ProductColorOptionNotFoundException(dto.getColorOptionId()));

        List<ProductInShoppingCart> withSameProductAndColor = shoppingCart.getProducts().stream()
                .filter(p -> p.getProduct().getId().equals(dto.getProductId()) &&
                        p.getColorOption().getId().equals(dto.getColorOptionId()))
                .toList();

        if(withSameProductAndColor.isEmpty()) {
            productInShoppingCartRepository.save(new ProductInShoppingCart(product, productColorOption, shoppingCart, dto.getQuantity(), dto.getSize()));
        } else {
            List<ProductInShoppingCart> withSameSize = withSameProductAndColor.stream()
                    .filter(p -> p.getSize().equals(dto.getSize()))
                    .toList();

            if(withSameSize.isEmpty()) {
                productInShoppingCartRepository.save(new ProductInShoppingCart(product, productColorOption, shoppingCart, dto.getQuantity(), dto.getSize()));
            } else {
                ProductInShoppingCart productInCart = withSameSize.get(0);
                productInCart.setQuantity(productInCart.getQuantity() + dto.getQuantity());
                productInShoppingCartRepository.save(productInCart);
            }
        }
        return this.getShoppingCartDto(shoppingCart);
    }

    @Override
    public Optional<ShoppingCartDto> editProductInShoppingCart(Integer id, ProductToCartDto dto) {
        ProductInShoppingCart productInCart = productInShoppingCartRepository.findById(id).orElseThrow(() -> new ProductInShoppingCartNotFoundException(dto.getProductId(), dto.getUsername()));
        ShoppingCart shoppingCart = userService.findByUsername(dto.getUsername()).getShoppingCart();

        List<ProductInShoppingCart> withSameProductAndSize = shoppingCart.getProducts().stream().filter(p -> !p.getId().equals(id) && p.getProduct().getId().equals(productInCart.getProduct().getId()) && p.getSize().equals(dto.getSize())).toList();
        if(!withSameProductAndSize.isEmpty()){
            ProductInShoppingCart another = withSameProductAndSize.get(0);
            productInCart.setQuantity(dto.getQuantity() + another.getQuantity());
            productInCart.setSize(dto.getSize());
            productInShoppingCartRepository.delete(another);
        }else{
            productInCart.setQuantity(dto.getQuantity());
            productInCart.setSize(dto.getSize());
        }
        this.productInShoppingCartRepository.save(productInCart);
        return this.getShoppingCartDto(shoppingCart);
    }

    @Override
    public Optional<ShoppingCartDto> removeProductFromCart(Integer id) {
        ProductInShoppingCart productInCart = productInShoppingCartRepository.findById(id).get();
        productInShoppingCartRepository.delete(productInCart);
        return this.getShoppingCartDto(productInCart.getShoppingCart());
    }

    @Override
    public void clearShoppingCart(String username) {
        ShoppingCartDto dto = getShoppingCartByUsername(username).orElseThrow(() -> new ShoppingCartNotFoundException(username));
        ShoppingCart cart = shoppingCartRepository.findById(dto.getId()).orElseThrow(() -> new ShoppingCartByIdNotFoundException(dto.getId()));
        productInShoppingCartRepository.deleteAll(cart.getProducts());
        cart.getProducts().clear();
        shoppingCartRepository.save(cart);
    }

    private Optional<ShoppingCartDto> getShoppingCartDto(ShoppingCart shoppingCart) {
        List<ProductInShoppingCartDto> productInCartDTOs = shoppingCart.getProducts().stream()
                .map(productInCart -> new ProductInShoppingCartDto(
                        productInCart.getId(),
                        new ProductDto(
                                productInCart.getProduct().getId(),
                                productInCart.getProduct().getTitle(),
                                productInCart.getProduct().getFullPrice(),
                                productInCart.getProduct().getDiscountPrice(),
                                productInCart.getProduct().getDescription(),
                                productInCart.getProduct().getDescriptionDetails(),
                                productInCart.getProduct().getWashingInstructions(),
                                productInCart.getProduct().getClothingCategory(),
                                productInCart.getProduct().getPersonCategory(),
                                productInCart.getProduct().getDetails().getLength().name(),
                                productInCart.getProduct().getDetails().getSleeves().name(),
                                productInCart.getProduct().getDetails().getNeckline().name(),
                                productInCart.getProduct().getDetails().getWaist().name(),
                                productInCart.getProduct().getDetails().getFit().name()
                        ),
                        new ProductColorOptionDto(
                                productInCart.getColorOption().getProduct().getId(),
                                productInCart.getColorOption().getCode(),
                                productInCart.getColorOption().getColor().getId(),
                                productInCart.getColorOption().getThumbnailUrl(),
                                productInCart.getColorOption().getModelSize()
                        ),
                        productInCart.getQuantity(),
                        productInCart.getSize()
                )).collect(Collectors.toList());
        return Optional.of(new ShoppingCartDto(shoppingCart.getId(), productInCartDTOs));
    }
}
