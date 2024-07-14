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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    private Product product;
    private String code;
    @ManyToOne
    private Color color;
    private String thumbnailUrl;
    private String modelSize;

    public ProductColorOption(Product product, String code, Color color, String thumbnailUrl, String modelSize) {
        this.product = product;
        this.code = code;
        this.color = color;
        this.thumbnailUrl = thumbnailUrl;
        this.modelSize = modelSize;
    }
}
