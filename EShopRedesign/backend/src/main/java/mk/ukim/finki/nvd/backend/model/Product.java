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
}
