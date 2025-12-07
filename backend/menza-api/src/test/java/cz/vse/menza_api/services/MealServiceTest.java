package cz.vse.menza_api.services;

import cz.vse.menza_api.dto.MealOverview;
import cz.vse.menza_api.models.Meal;
import cz.vse.menza_api.models.MealsHistory;
import cz.vse.menza_api.repositories.MealRepository;
import cz.vse.menza_api.repositories.MealsHistoryRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class MealServiceTest {

    // 1. Vytvoříme falešné (mock) verze repozitářů
    @Mock
    private MealRepository mealRepository;

    @Mock
    private MealsHistoryRepository mealsHistoryRepository;

    @InjectMocks
    private MealService mealService;

    @Test
    void getMealOverview_ShouldReturnLastPrice_WhenHistoryExists() {
        // Arrange
        Long mealId = 1L;
        Meal mockMeal = new Meal();
        mockMeal.setId(mealId);
        mockMeal.setName("Svíčková");

        MealsHistory h1 = new MealsHistory(); h1.setPrice(new BigDecimal("100"));
        MealsHistory h2 = new MealsHistory(); h2.setPrice(new BigDecimal("120"));
        MealsHistory h3 = new MealsHistory(); h3.setPrice(new BigDecimal("150"));

        // Definujeme chování mocků
        when(mealRepository.findById(mealId)).thenReturn(Optional.of(mockMeal));
        when(mealsHistoryRepository.findByMeal_Id(mealId)).thenReturn(List.of(h1, h2, h3));

        // Act
        MealOverview result = mealService.getMealOverview(mealId);

        // Assert
        assertEquals(new BigDecimal("150"), result.getPrice());
    }

    @Test
    void getMealOverview_ShouldReturnZero_WhenHistoryIsEmpty() {
        // Arrange
        Long mealId = 1L;
        Meal mockMeal = new Meal();
        mockMeal.setId(mealId);

        when(mealRepository.findById(mealId)).thenReturn(Optional.of(mockMeal));
        // Vrátíme prázdný seznam
        when(mealsHistoryRepository.findByMeal_Id(mealId)).thenReturn(Collections.emptyList());

        // Act
        MealOverview result = mealService.getMealOverview(mealId);

        // Assert
        assertEquals(BigDecimal.ZERO, result.getPrice());
    }
}