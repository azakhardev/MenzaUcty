package cz.vse.menza_api.models;

import cz.vse.menza_api.models.enums.RatingType;
import jakarta.persistence.*;

@Entity
@Table(name = "Ratings")
@IdClass(RatingId.class)
public class Rating {

    @Id
    @ManyToOne
    @JoinColumn(name = "mealId", nullable = false)
    private Meal meal;

    @Id
    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RatingType rating = RatingType.NONE;

    // Getters and setters
    public Meal getMeal() { return meal; }
    public void setMeal(Meal meal) { this.meal = meal; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public RatingType getRating() { return rating; }
    public void setRating(RatingType rating) { this.rating = rating; }
}
