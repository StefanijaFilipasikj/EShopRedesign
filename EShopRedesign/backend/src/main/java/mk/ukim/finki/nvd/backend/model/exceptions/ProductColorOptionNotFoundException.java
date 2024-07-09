package mk.ukim.finki.nvd.backend.model.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class ProductColorOptionNotFoundException extends RuntimeException {
    public ProductColorOptionNotFoundException(Integer id) {
        super(String.format("Product Color Option with id: %d was not found", id));
    }
}
