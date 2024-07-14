package mk.ukim.finki.nvd.backend.model.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class ColorNotFoundException extends RuntimeException{
    public ColorNotFoundException(Integer id) {
        super(String.format("Color with id %d not found", id));
    }
}
