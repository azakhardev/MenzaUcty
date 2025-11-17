package cz.vse.menza_api.models;

import jakarta.persistence.*;

@Entity
@Table(name = "MealsAlergens")
@IdClass(MealsAlergensId.class)
public class MealsAlergens {

    @Id
    @ManyToOne
    @JoinColumn(name = "mealId", nullable = false)
    private Meal meal;

    @Id
    @ManyToOne
    @JoinColumn(name = "alergenId", nullable = false)
    private Alergen alergen;

    @Column(length = 1024)
    private String value;

    // Getters and setters
    public Meal getMeal() { return meal; }
    public void setMeal(Meal meal) { this.meal = meal; }
    public Alergen getAlergen() { return alergen; }
    public void setAlergen(Alergen alergen) { this.alergen = alergen; }
    public String getValue() { return value; }
    public void setValue(String value) { this.value = value; }
}
