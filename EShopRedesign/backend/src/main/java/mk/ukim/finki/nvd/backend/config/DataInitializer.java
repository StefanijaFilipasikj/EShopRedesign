package mk.ukim.finki.nvd.backend.config;

import jakarta.annotation.PostConstruct;
import mk.ukim.finki.nvd.backend.BackendApplication;
import mk.ukim.finki.nvd.backend.model.*;
import mk.ukim.finki.nvd.backend.model.enumerations.Role;
import mk.ukim.finki.nvd.backend.repository.*;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.Scanner;

@Component
public class DataInitializer {

    private final ProductRepository productRepository;
    private final ProductColorOptionRepository colorOptionRepository;
    private final ProductImageRepository productImageRepository;
    private final UserRepository userRepository;
    private final ShoppingCartRepository shoppingCartRepository;


    public DataInitializer(ProductRepository productRepository, ProductColorOptionRepository colorOptionRepository, ProductImageRepository productImageRepository, UserRepository userRepository, ShoppingCartRepository shoppingCartRepository) {
        this.productRepository = productRepository;
        this.colorOptionRepository = colorOptionRepository;
        this.productImageRepository = productImageRepository;
        this.userRepository = userRepository;
        this.shoppingCartRepository = shoppingCartRepository;
    }


    @PostConstruct
    public void readData() throws IOException {

        ClassLoader loader = BackendApplication.class.getClassLoader();

        // Load products
        File productsFile = new File(loader.getResource("csv/products.csv").getFile());
        Scanner productsScanner = new Scanner(productsFile, "UTF-8");
        productsScanner.nextLine();

        while (productsScanner.hasNextLine()) {
            String line = productsScanner.nextLine();
            String[] parts = line.split(",");
            Product p = new Product(Integer.parseInt(parts[0]), parts[1], Double.parseDouble(parts[2]), Double.parseDouble(parts[3]), parts[4], parts[5], parts[6]);
            this.productRepository.save(p);
        }


        // Load product color options
        File colorOptionsFile = new File(loader.getResource("csv/product_color_options.csv").getFile());
        Scanner colorOptionsScanner = new Scanner(colorOptionsFile, "UTF-8");
        colorOptionsScanner.nextLine();

        while (colorOptionsScanner.hasNextLine()) {
            String line = colorOptionsScanner.nextLine();
            String[] parts = line.split(",");
            Product p = this.productRepository.findById(Integer.parseInt(parts[1])).get();
            ProductColorOption pco = new ProductColorOption(Integer.parseInt(parts[0]), p, parts[2], parts[3], parts[4], parts[5]);
            this.colorOptionRepository.save(pco);
        }


        // Load product color option images
        File productImagesFile = new File(loader.getResource("csv/color_option_images.csv").getFile());
        Scanner productImageScanner = new Scanner(productImagesFile, "UTF-8");
        productImageScanner.nextLine();

        while (productImageScanner.hasNextLine()) {
            String line = productImageScanner.nextLine();
            String[] parts = line.split(",");
            ProductColorOption pco = this.colorOptionRepository.findById(Integer.parseInt(parts[1])).get();
            ProductImage img = new ProductImage(Integer.parseInt(parts[0]), pco, parts[2]);
            this.productImageRepository.save(img);
        }


        // Create a user
        ShoppingCart sc = this.shoppingCartRepository.save(new ShoppingCart());
        userRepository.save(new User("user", "user", Role.ROLE_USER, sc));

    }
}
