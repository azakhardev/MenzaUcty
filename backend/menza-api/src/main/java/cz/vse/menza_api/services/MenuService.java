package cz.vse.menza_api.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import cz.vse.menza_api.dto.MealOverview;
import cz.vse.menza_api.dto.menu.BuffetMenu;
import cz.vse.menza_api.dto.menu.DailyMenu;
import cz.vse.menza_api.dto.menu.DailyMenuResponse;
import cz.vse.menza_api.dto.menu.WeeklyMenu;
import cz.vse.menza_api.models.Alergen;
import cz.vse.menza_api.models.Meal;
import cz.vse.menza_api.models.MealsHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

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

            // 1. Získáme syrové entity Jídel podle IDček z JSONu
            List<Meal> rawSoups = mealService.getMealsByIds(dailyMenu.getSoups());
            List<Meal> rawMainCourses = mealService.getMealsByIds(dailyMenu.getMainCourses());

            // 2. Použijeme mapToMealOverview pro transformaci (Meal -> MealOverview s cenou a alergeny)
            // Zde voláme vaši metodu a předáváme jí datum pro dohledání ceny
            response.setSoups(mapToMealOverview(rawSoups, date));
            response.setMainCourses(mapToMealOverview(rawMainCourses, date));

            return response;

        } catch (IOException e) {
            throw new RuntimeException("Error loading menu: " + e.getMessage(), e);
        }
    }

    private List<MealOverview> mapToMealOverview(List<Meal> meals, LocalDate targetDate) {
        return meals.stream().map(meal -> {
            List<MealsHistory> history = mealService.getMealHistory(meal.getId());

            BigDecimal price = history.stream()
                    // 1. Filtrujeme ceny: Bereme jen ty, co byly nastaveny DNES nebo KDYKOLIV DŘÍVE
                    // (Ignorujeme ceny nastavené do budoucnosti, např. od 12.12.)
                    .filter(record -> !record.getDate().isAfter(targetDate))

                    // 2. Seřadíme je podle data a vezmeme tu NEJNOVĚJŠÍ z nich
                    // (Tedy pro 9.12. to vybere záznam ze 7.12., protože je to "nejčerstvější" platná cena)
                    .max(java.util.Comparator.comparing(MealsHistory::getDate))

                    // 3. Vytáhneme cenu
                    .map(MealsHistory::getPrice)
                    .orElse(null);

            // Získání alergenů
            List<Alergen> allergens = mealService.getMealAllergens(meal.getId());

            return new MealOverview(
                    meal.getId(),
                    meal.getName(),
                    price,
                    allergens
            );
        }).toList();
    }

    public WeeklyMenu getWeeklyMenu(String canteenName) {
        try {
            Resource resource = resourceLoader.getResource(menuSource + canteenName + "/menu.json");

            WeeklyMenu weeklyMenu = objectMapper.readValue(resource.getInputStream(), WeeklyMenu.class);

            return weeklyMenu;

        }catch (Exception e){
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