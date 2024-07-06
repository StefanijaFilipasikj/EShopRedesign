package mk.ukim.finki.nvd.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductImage {
    @Id
    private Integer id;
    @ManyToOne
    private ProductColorOption colorOption;
    private String imageUrl;

    public ProductImage(ProductColorOption colorOption, String imageUrl) {
        this.colorOption = colorOption;
        this.imageUrl = imageUrl;
    }
}
