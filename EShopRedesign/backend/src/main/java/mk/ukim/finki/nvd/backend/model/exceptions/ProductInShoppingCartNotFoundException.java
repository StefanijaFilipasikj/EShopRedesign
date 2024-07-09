package mk.ukim.finki.nvd.backend.model.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class ProductInShoppingCartNotFoundException extends RuntimeException{
    public ProductInShoppingCartNotFoundException(Integer id, String username) {
        super(String.format("Product with id: %d was not found in shopping cart of user: %s", id, username));
    }

}
