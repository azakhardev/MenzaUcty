package cz.vse.menza_api.dto.history;

import java.math.BigDecimal;
import java.time.LocalDate;

public class UserHistoryItemDto {
    private final Long id;
    private final String name;
    private final LocalDate date;
    private final BigDecimal price;
    private final Integer kcal;

    public UserHistoryItemDto(Long id, String name, LocalDate date, BigDecimal price, Integer kcal) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.price = price;
        this.kcal = kcal;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public LocalDate getDate() { return date; }
    public BigDecimal getPrice() { return price; }
    public Integer getKcal() { return kcal; }
}