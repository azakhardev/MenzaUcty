package cz.vse.menza_api.dto.menu;

import java.util.List;

public class BuffetMenu {
    private List<Long> snacks;
    private List<Long> drinks;

    public BuffetMenu() {}

    public BuffetMenu(List<Long> snacks, List<Long> drinks) {
        this.snacks = snacks;
        this.drinks = drinks;
    }

    public List<Long> getSnacks() {
        return snacks;
    }

    public void setSnacks(List<Long> snacks) {
        this.snacks = snacks;
    }

    public List<Long> getDrinks() {
        return drinks;
    }

    public void setDrinks(List<Long> drinks) {
        this.drinks = drinks;
    }
}
