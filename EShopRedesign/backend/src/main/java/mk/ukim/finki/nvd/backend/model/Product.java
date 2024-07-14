package mk.ukim.finki.nvd.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.nvd.backend.model.enumerations.ClothingCategory;
import mk.ukim.finki.nvd.backend.model.enumerations.PersonCategory;
import mk.ukim.finki.nvd.backend.model.enumerations.details.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private Double fullPrice;
    private Double discountPrice;
    private String description;
    @Column(length = 500)
    private String descriptionDetails;
    @Column(length = 500)
    private String washingInstructions;
    @Enumerated(EnumType.STRING)
    private ClothingCategory clothingCategory;
    @Enumerated(EnumType.STRING)
    private PersonCategory personCategory;
    @Embedded
    private ProductDetailsInline details;

    public Product(int id, String title, Double fullPrice, Double discountPrice, String description, String descriptionDetails, String washingInstructions, ClothingCategory clothingCategory, PersonCategory personCategory, Length length, Sleeves sleeves, Neckline neckline, Waist waist, Fit fit) {
        this.id = id;
        this.title = title;
        this.fullPrice = fullPrice;
        this.discountPrice = discountPrice;
        this.description = description;
        this.descriptionDetails = descriptionDetails;
        this.washingInstructions = washingInstructions;
        this.clothingCategory = clothingCategory;
        this.personCategory = personCategory;

        this.details = new ProductDetailsInline();
        this.details.setLength(length);
        this.details.setSleeves(sleeves);
        this.details.setNeckline(neckline);
        this.details.setWaist(waist);
        this.details.setFit(fit);
    }
    public Product(String title, Double fullPrice, Double discountPrice, String description, String descriptionDetails, String washingInstructions, ClothingCategory clothingCategory, PersonCategory personCategory, Length length, Sleeves sleeves, Neckline neckline, Waist waist, Fit fit) {
        this.title = title;
        this.fullPrice = fullPrice;
        this.discountPrice = discountPrice;
        this.description = description;
        this.descriptionDetails = descriptionDetails;
        this.washingInstructions = washingInstructions;
        this.clothingCategory = clothingCategory;
        this.personCategory = personCategory;

        this.details = new ProductDetailsInline();
        this.details.setLength(length);
        this.details.setSleeves(sleeves);
        this.details.setNeckline(neckline);
        this.details.setWaist(waist);
        this.details.setFit(fit);
    }
}
