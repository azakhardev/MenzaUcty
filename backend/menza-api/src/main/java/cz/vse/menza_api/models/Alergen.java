package cz.vse.menza_api.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "Alergens")
public class Alergen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String name;

    @OneToMany(mappedBy = "alergen", cascade = CascadeType.ALL)
    private List<MealsAlergens> mealsAlergens;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
