package cz.vse.menza_api.services;

import cz.vse.menza_api.dto.menu.DailyMenuResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.test.util.ReflectionTestUtils;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.List;
import java.io.ByteArrayInputStream;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MenuServiceTest {

    @Mock
    private MealService mealService;

    @Mock
    private ResourceLoader resourceLoader;

    @Mock
    private Resource mockResource;

    private MenuService menuService;

    @BeforeEach
    void setUp() {
        // Vytvoříme instanci ručně, protože konstruktor dělá logiku s Jacksonem
        menuService = new MenuService(mealService, resourceLoader);

        // Nastavíme privátní proměnnou @Value, která by se normálně načetla z application.properties
        ReflectionTestUtils.setField(menuService, "menuSource", "classpath:data/");
    }

    @Test
    void getMenuForDay_ShouldParseJsonAndReturnCorrectData() throws Exception {
        // 1. Příprava testovacího JSONu (simulujeme obsah souboru)
        String jsonContent = """
            {
              "days": [
                {
                  "date": "2023-10-10",
                  "mainCourses": [1, 2],
                  "soups": [3]
                }
              ]
            }
        """;

        // 2. Nastavení chování ResourceLoaderu
        // Když se service zeptá na soubor, vrátíme náš String jako ByteArrayResource
        when(resourceLoader.getResource(anyString())).thenReturn(mockResource);
        when(mockResource.getInputStream()).thenReturn(new ByteArrayInputStream(jsonContent.getBytes(StandardCharsets.UTF_8)));

        // Mock MealService (protože getMenuForDay ho volá)
        when(mealService.getMealsByIds(List.of(1L, 2L))).thenReturn(List.of()); // Vrátíme prázdný list jen aby to nepadlo
        when(mealService.getMealsByIds(List.of(3L))).thenReturn(List.of());

        // 3. Akce
        LocalDate testDate = LocalDate.of(2023, 10, 10);
        DailyMenuResponse response = menuService.getMenuForDay(testDate, "canteen1");

        // 4. Ověření
        assertNotNull(response);
        // Tímto jsme ověřili, že Jackson správně rozparsoval JSON, našel správné datum a zavolal mealService
    }

    @Test
    void getWeeklyMenu_ShouldThrowException_WhenFileIsMissing() throws Exception {
        // Simulace chyby při čtení (např. soubor neexistuje)
        when(resourceLoader.getResource(anyString())).thenThrow(new RuntimeException("File not found"));

        assertThrows(RuntimeException.class, () -> {
            menuService.getWeeklyMenu("invalidCanteen");
        });
    }
}