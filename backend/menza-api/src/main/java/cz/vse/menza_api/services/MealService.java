package cz.vse.menza_api.services;

import cz.vse.menza_api.dto.MealOverview;
import cz.vse.menza_api.exceptions.ResourceNotFoundException;
import cz.vse.menza_api.models.Alergen;
import cz.vse.menza_api.models.Meal;
import cz.vse.menza_api.models.MealsHistory;
import cz.vse.menza_api.repositories.MealRepository;
import cz.vse.menza_api.repositories.MealsHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class MealService {
    MealRepository mealRepository;
    MealsHistoryRepository mealsHistoryRepository;

    @Autowired
    public MealService(MealRepository mealRepository, MealsHistoryRepository mealsHistoryRepository) {
        this.mealRepository = mealRepository;
        this.mealsHistoryRepository = mealsHistoryRepository;
    }

    public Meal getMealDetail(Long id) {
        Meal meal = mealRepository.findById(id).orElse(null);

        if(meal == null) {
            throw new ResourceNotFoundException("Meal not found");
        }

        return meal;
    }

    public List<Meal> getMealsByIds(List<Long> ids) {

        return new ArrayList<>(mealRepository.findAllById(ids));
    }

    public MealOverview getMealOverview(Long id) {
        Meal meal = mealRepository.findById(id).orElse(null);

        if(meal == null) {
            throw new ResourceNotFoundException("Meal not found");
        }

        //TODO: Map price and alergens
        return new MealOverview(meal.getId(), meal.getName(), new BigDecimal(0), Collections.emptyList());
    }

    public List<MealsHistory> getMealHistory(Long mealId) {
        return mealsHistoryRepository.findByMeal_Id(mealId);
    }

    public List<Alergen> getMealAllergens(Long mealId) {
        return mealRepository.findMealAlergens(mealId);
    }
}
