package cz.vse.menza_api.dto.menu;

import java.util.List;

public class BuffetMenu {
    private List<BuffetItem> snacks;
    private List<BuffetItem> drinks;

    public BuffetMenu() {}

    public BuffetMenu(List<BuffetItem> snacks, List<BuffetItem> drinks) {
        this.snacks = snacks;
        this.drinks = drinks;
    }

    public List<BuffetItem> getSnacks() {
        return snacks;
    }

    public void setSnacks(List<BuffetItem> snacks) {
        this.snacks = snacks;
    }

    public List<BuffetItem> getDrinks() {
        return drinks;
    }

    public void setDrinks(List<BuffetItem> drinks) {
        this.drinks = drinks;
    }
}
