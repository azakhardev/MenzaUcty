package cz.vse.menza_api.dto.menu;

import java.time.LocalDate;
import java.util.List;

public class DailyMenu {
    private LocalDate date;
    private List<Long> mainCourses;
    private List<Long> soups;

    public DailyMenu() {}

    public DailyMenu(LocalDate date, List<Long> mainCourses, List<Long> soups) {
        this.date = date;
        this.mainCourses = mainCourses;
        this.soups = soups;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public List<Long> getMainCourses() {
        return mainCourses;
    }

    public void setMainCourses(List<Long> mainCourses) {
        this.mainCourses = mainCourses;
    }

    public List<Long> getSoups() {
        return soups;
    }

    public void setSoups(List<Long> soups) {
        this.soups = soups;
    }
}
