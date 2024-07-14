package mk.ukim.finki.nvd.backend.model;

import jakarta.persistence.Embeddable;
import lombok.Data;
import mk.ukim.finki.nvd.backend.model.enumerations.details.*;

@Embeddable
@Data
public class ProductDetailsInline {
    private Length length;
    private Sleeves sleeves;
    private Neckline neckline;
    private Waist waist;
    private Fit fit;
}
