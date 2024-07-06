package mk.ukim.finki.nvd.backend.model.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)

public class ProductImageNotFoundException extends RuntimeException{
    public ProductImageNotFoundException(Integer id) {
        super(String.format("Product image with id: %d is not found", id));
    }
}
