package cz.vse.menza_api.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "Meals")
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 1024)
    private String imageUrl;

    private Integer weight;
    private Integer kcal;
    private Integer fats;
    private Integer proteins;
    private Integer carbs;

    @Column(length = 256)
    private String category;

    @OneToMany(mappedBy = "meal", cascade = CascadeType.ALL)
    private List<OrdersHistory> orders;

    @OneToMany(mappedBy = "meal", cascade = CascadeType.ALL)
    private List<Rating> ratings;

    @OneToMany(mappedBy = "meal", cascade = CascadeType.ALL)
    private List<MealsHistory> mealHistory;

    @OneToMany(mappedBy = "meal", cascade = CascadeType.ALL)
    private List<MealsAlergens> mealAlergens;

    public Meal() {}

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public Integer getWeight() { return weight; }
    public void setWeight(Integer weight) { this.weight = weight; }
    public Integer getKcal() { return kcal; }
    public void setKcal(Integer kcal) { this.kcal = kcal; }
    public Integer getFats() { return fats; }
    public void setFats(Integer fats) { this.fats = fats; }
    public Integer getProteins() { return proteins; }
    public void setProteins(Integer proteins) { this.proteins = proteins; }
    public Integer getCarbs() { return carbs; }
    public void setCarbs(Integer carbs) { this.carbs = carbs; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}
