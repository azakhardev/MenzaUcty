package cz.vse.menza_api.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import cz.vse.menza_api.dto.menu.BuffetMenu;
import cz.vse.menza_api.dto.menu.DailyMenu;
import cz.vse.menza_api.dto.menu.DailyMenuResponse;
import cz.vse.menza_api.dto.menu.WeeklyMenu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;

@Service
public class MenuService {

    @Value("${menu.source}")
    private String menuSource;

    private final ObjectMapper objectMapper;
    private final MealService mealService;
    private final ResourceLoader resourceLoader;

    @Autowired
    public MenuService(MealService mealService, ResourceLoader resourceLoader) {
        this.mealService = mealService;
        this.resourceLoader = resourceLoader;

        //Allows JACKSON to transform timestamps to LocalDate
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
        this.objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }

    public DailyMenuResponse getMenuForDay(LocalDate date, String canteenName) {
        try {
            // Load JSON
            Resource resource = resourceLoader.getResource(menuSource + canteenName + "/menu.json");

            // Transform to WeeklyMenu object
            WeeklyMenu weeklyMenu = objectMapper.readValue(resource.getInputStream(), WeeklyMenu.class);

            // Find date by day
            DailyMenu dailyMenu = weeklyMenu.getDays().stream()
                    .filter(day -> day.getDate().equals(date))
                    .findFirst()
                    .orElse(null);


            if (dailyMenu == null) {
                return null;
            }

            DailyMenuResponse response = new DailyMenuResponse();

            response.setMainCourses(mealService.getMealsByIds(dailyMenu.getMainCourses()));
            response.setSoups(mealService.getMealsByIds(dailyMenu.getSoups()));

            return response;

        } catch (IOException e) {
            throw new RuntimeException("Error loading menu: " + e.getMessage(), e);
        }
    }

    public BuffetMenu getBuffetMenu(String canteenName) {
        try {
            Resource resource = resourceLoader.getResource(menuSource + canteenName + "/buffet.json");

            return objectMapper.readValue(resource.getInputStream(), BuffetMenu.class);
        }catch (IOException e){
            throw new RuntimeException("Error loading menu: " + e.getMessage(), e);
        }
    }

}