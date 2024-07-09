package mk.ukim.finki.nvd.backend.model.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class ShoppingCartNotFoundException extends RuntimeException{
    public ShoppingCartNotFoundException(Integer id) {
        super(String.format("Shopping cart with id: %d was not found", id));
    }
}
