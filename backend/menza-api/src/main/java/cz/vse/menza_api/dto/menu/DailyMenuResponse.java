package cz.vse.menza_api.dto.menu;

import cz.vse.menza_api.models.Meal;

import java.util.List;

public class DailyMenuResponse {
    private List<Meal> mainCourses;

    private List<Meal> soups;

    public DailyMenuResponse() {}

    public DailyMenuResponse(List<Meal> mainCourses, List<Meal> soups) {
        this.mainCourses = mainCourses;
        this.soups = soups;
    }

    public List<Meal> getMainCourses() {
        return mainCourses;
    }

    public void setMainCourses(List<Meal> mainCourses) {
        this.mainCourses = mainCourses;
    }

    public List<Meal> getSoups() {
        return soups;
    }

    public void setSoups(List<Meal> soups) {
        this.soups = soups;
    }
}
