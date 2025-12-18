package cz.vse.menza_api.dto.menu;

import cz.vse.menza_api.dto.MealOverview;
import java.util.List;

public class DailyMenuResponse {

    // ZMĚNA: Místo List<Meal> zde musí být List<MealOverview>
    private List<MealOverview> soups;
    private List<MealOverview> mainCourses;

    // --- Getters ---
    public List<MealOverview> getSoups() {
        return soups;
    }

    public List<MealOverview> getMainCourses() {
        return mainCourses;
    }

    // --- Setters ---
    // Toto je metoda, na kterou si stěžuje vaše IDE. Nyní přijímá správný typ.
    public void setSoups(List<MealOverview> soups) {
        this.soups = soups;
    }

    public void setMainCourses(List<MealOverview> mainCourses) {
        this.mainCourses = mainCourses;
    }
}