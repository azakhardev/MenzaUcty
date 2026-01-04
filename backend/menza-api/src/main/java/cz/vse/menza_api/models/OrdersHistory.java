package cz.vse.menza_api.models;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "OrdersHistory")
public class OrdersHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "mealId", nullable = false)
    private Meal meal;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal price;

    public OrdersHistory() {}

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public Meal getMeal() { return meal; }
    public void setMeal(Meal meal) { this.meal = meal; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
}
