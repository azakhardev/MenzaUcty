package cz.vse.menza_api.dto.menu;

import java.util.List;

public class WeeklyMenu {
    private List<DailyMenu> days;

    public List<DailyMenu> getDays() {
        return days;
    }

    public void setDays(List<DailyMenu> days) {
        this.days = days;
    }

    public WeeklyMenu() {}

    public WeeklyMenu(List<DailyMenu> days) {
        this.days = days;
    }
}
