package cz.vse.menza_api.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URL;
import java.time.LocalDate;

@Service
public class MenuService {

    @Value("${menu.source}")
    private String menuSource;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final MealService mealService;

    @Autowired
    public MenuService(MealService mealService) {
        this.mealService = mealService;
    }
//
//    public MenuDay getMenuForDate(LocalDate date) throws IOException {
//        URL url = new URL(menuSource);
//        WeeklyMenu weeklyMenu = objectMapper.readValue(url, WeeklyMenu.class);
//
//        return weeklyMenu.getWeeks().stream()
//                .flatMap(week -> week.getDays().stream())
//                .filter(day -> day.getDate().equals(date))
//                .findFirst()
//                .orElse(null);
//    }
//
//    public MenuDayResponse getFullMenuForDate(LocalDate date) throws IOException {
//        MenuDay day = getMenuForDate(date);
//        if (day == null) return null;
//
//        return new MenuDayResponse(
//                date,
//                mealService.getMealsByIds(day.getMainCourses()),
//                mealService.getMealsByIds(day.getBuffet()),
//                mealService.getMealsByIds(day.getDrinks())
//        );
//    }
}