package mk.ukim.finki.nvd.backend.service.impl;

import lombok.AllArgsConstructor;
import mk.ukim.finki.nvd.backend.model.Product;
import mk.ukim.finki.nvd.backend.model.ProductColorOption;
import mk.ukim.finki.nvd.backend.model.dto.ColorFilterDto;
import mk.ukim.finki.nvd.backend.model.dto.CustomFilterDto;
import mk.ukim.finki.nvd.backend.model.dto.PriceFilterDto;
import mk.ukim.finki.nvd.backend.model.dto.ProductDto;
import mk.ukim.finki.nvd.backend.model.enumerations.ClothingCategory;
import mk.ukim.finki.nvd.backend.model.enumerations.PersonCategory;
import mk.ukim.finki.nvd.backend.model.enumerations.details.*;
import mk.ukim.finki.nvd.backend.model.exceptions.ProductNotFoundException;
import mk.ukim.finki.nvd.backend.repository.ColorRepository;
import mk.ukim.finki.nvd.backend.repository.ProductColorOptionRepository;
import mk.ukim.finki.nvd.backend.repository.ProductRepository;
import mk.ukim.finki.nvd.backend.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductColorOptionRepository colorOptionRepository;
    private final ColorRepository colorRepository;

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
        Product product = new Product(dto.getTitle(), dto.getFullPrice(), dto.getDiscountPrice(), dto.getDescription(), dto.getDescriptionDetails(), dto.getWashingInstructions(), dto.getClothingCategory(), dto.getPersonCategory(), Length.valueOf(dto.getLength()), Sleeves.valueOf(dto.getSleeves()), Neckline.valueOf(dto.getNeckline()), Waist.valueOf(dto.getWaist()), Fit.valueOf(dto.getFit()));
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

    @Override
    public List<String> findAllClothingCategoriesFor(String person) {
        PersonCategory pc = PersonCategory.valueOf(person);
        return productRepository.findByPersonCategory(pc).stream().map(p -> p.getClothingCategory().name()).distinct().toList();
    }

    @Override
    public List<Product> filterByPerson(String person) {
        PersonCategory pc = PersonCategory.valueOf(person);
        return productRepository.findByPersonCategory(pc);
    }

    @Override
    public List<Product> filterByPersonAndClothing(String person, String clothing) {
        PersonCategory pc = PersonCategory.valueOf(person);
        ClothingCategory cc = ClothingCategory.valueOf(clothing);
        return productRepository.findByPersonCategoryAndClothingCategory(pc, cc);
    }

    @Override
    public List<Product> filterByPrice(String person, String clothing, PriceFilterDto dto) {
        if(person.equals("ALL") && clothing.equals("ALL")){
            return productRepository.findByFullPriceBetween(dto.getMin(), dto.getMax()).stream().toList();
        }else if(person.equals("ALL")){
            ClothingCategory cc = ClothingCategory.valueOf(clothing);
            return productRepository.findByClothingCategoryAndFullPriceBetween(cc, dto.getMin(), dto.getMax());
        }else if(clothing.equals("ALL")){
            PersonCategory pc = PersonCategory.valueOf(person);
            return productRepository.findByPersonCategoryAndFullPriceBetween(pc, dto.getMin(), dto.getMax());
        }else{
            ClothingCategory cc = ClothingCategory.valueOf(clothing);
            PersonCategory pc = PersonCategory.valueOf(person);
            return productRepository.findByPersonCategoryAndClothingCategoryAndFullPriceBetween(pc, cc, dto.getMin(), dto.getMax());
        }
    }

    @Override
    public List<Product> filterByColor(String person, String clothing, ColorFilterDto dto) {
        List<Product> products = dto.getColors().stream()
                .map(c -> colorOptionRepository.findByColor(colorRepository.findByColor(c)))
                .flatMap(Collection::stream).map(ProductColorOption::getProduct).toList();
        if(person.equals("ALL") && clothing.equals("ALL")){
            return products;
        }else if(person.equals("ALL")){
            ClothingCategory cc = ClothingCategory.valueOf(clothing);
            return products.stream().filter(this.productRepository.findByClothingCategory(cc)::contains).toList();
        }else if(clothing.equals("ALL")){
            PersonCategory pc = PersonCategory.valueOf(person);
            return products.stream().filter(this.productRepository.findByPersonCategory(pc)::contains).toList();
        }else{
            ClothingCategory cc = ClothingCategory.valueOf(clothing);
            PersonCategory pc = PersonCategory.valueOf(person);
            return products.stream().filter(this.productRepository.findByPersonCategoryAndClothingCategory(pc, cc)::contains).toList();
        }
    }

    @Override
    public List<Product> filterByCustom(String person, String clothing, CustomFilterDto dto) {
        PersonCategory pc = PersonCategory.valueOf(person);
        ClothingCategory cc = ClothingCategory.valueOf(clothing);

        Length l = dto.getLength().isEmpty() ? Length.NONE : Length.valueOf(dto.getLength());
        Sleeves s = dto.getSleeves().isEmpty() ? Sleeves.NONE : Sleeves.valueOf(dto.getSleeves());
        Neckline n = dto.getNeckline().isEmpty() ? Neckline.NONE : Neckline.valueOf(dto.getNeckline());
        Waist w = dto.getWaist().isEmpty() ? Waist.NONE : Waist.valueOf(dto.getWaist());
        Fit f = dto.getFit().isEmpty() ? Fit.NONE : Fit.valueOf(dto.getFit());

        return productRepository.findByPersonCategoryAndClothingCategoryAndDetails_LengthAndDetails_SleevesAndDetails_NecklineAndDetails_WaistAndDetails_Fit(pc, cc, l, s, n, w, f);
    }
}
