package cz.vse.menza_api.dto.menu;

public class BuffetItem {
    private String name;

    private Long price;

    public BuffetItem(){

    }

    public BuffetItem(String name, Long price) {
        this.name = name;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }
}
