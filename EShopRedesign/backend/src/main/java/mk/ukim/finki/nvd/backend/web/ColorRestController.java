package mk.ukim.finki.nvd.backend.web;

import lombok.AllArgsConstructor;
import mk.ukim.finki.nvd.backend.model.Color;
import mk.ukim.finki.nvd.backend.service.ColorService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/colors")
@AllArgsConstructor
public class ColorRestController {
    private final ColorService colorService;

    @GetMapping
    private List<Color> findAll() {
        return this.colorService.findAll();
    }
}
