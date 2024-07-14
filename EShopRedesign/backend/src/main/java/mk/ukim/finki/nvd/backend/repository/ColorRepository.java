package mk.ukim.finki.nvd.backend.repository;

import mk.ukim.finki.nvd.backend.model.Color;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColorRepository extends JpaRepository<Color, Integer> {
    Color findByColor(String color);
}
