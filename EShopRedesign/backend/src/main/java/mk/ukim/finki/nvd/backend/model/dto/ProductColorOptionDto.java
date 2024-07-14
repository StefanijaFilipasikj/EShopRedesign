package mk.ukim.finki.nvd.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductColorOptionDto {
    private Integer productId;
    private String code;
    private Integer colorId;
    private String thumbnailUrl;
    private String modelSize;
}
