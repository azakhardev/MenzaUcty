package cz.vse.menza_api.dto;

import cz.vse.menza_api.models.Alergen;

import java.math.BigDecimal;
import java.util.List;

public class MealOverview {
    private Long id;

    private String name;

    private BigDecimal price;

    private List<Alergen> allergenList;


    public MealOverview(Long id, String name, BigDecimal price, List<Alergen> allergenList) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.allergenList = allergenList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public List<Alergen> getAlergenList() {
        return allergenList;
    }

    public void setAlergenList(List<Alergen> allergenList) {
        this.allergenList = allergenList;
    }
}
