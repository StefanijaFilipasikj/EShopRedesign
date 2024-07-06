package mk.ukim.finki.nvd.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductColorOption {
    @Id
    private Integer id;
    @ManyToOne
    private Product product;
    private String code;
    private String color;
    private String thumbnailUrl;
    private String modelSize;

    public ProductColorOption(Product product, String code, String color, String thumbnailUrl, String modelSize) {
        this.product = product;
        this.code = code;
        this.color = color;
        this.thumbnailUrl = thumbnailUrl;
        this.modelSize = modelSize;
    }
}
