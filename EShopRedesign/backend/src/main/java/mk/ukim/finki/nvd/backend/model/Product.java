package mk.ukim.finki.nvd.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    private Integer id;
    private String title;
    private Double fullPrice;
    private Double discountPrice;
    private String description;
    @Column(length = 500)
    private String description_details;
    @Column(length = 500)
    private String washing_instructions;

    public Product(String title, Double fullPrice, Double discountPrice, String description, String description_details, String washing_instructions) {
        this.title = title;
        this.fullPrice = fullPrice;
        this.discountPrice = discountPrice;
        this.description = description;
        this.description_details = description_details;
        this.washing_instructions = washing_instructions;
    }
}
