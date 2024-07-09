package mk.ukim.finki.nvd.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.nvd.backend.model.enumerations.ClothingCategory;
import mk.ukim.finki.nvd.backend.model.enumerations.PersonCategory;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private Integer id;
    private String title;
    private Double fullPrice;
    private Double discountPrice;
    private String description;
    private String descriptionDetails;
    private String washingInstructions;
    private ClothingCategory clothingCategory;
    private PersonCategory personCategory;
}
