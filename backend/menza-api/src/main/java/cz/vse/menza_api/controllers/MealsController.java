package cz.vse.menza_api.controllers;

import cz.vse.menza_api.dto.RatingResponse;
import cz.vse.menza_api.models.Alergen;
import cz.vse.menza_api.models.Meal;
import cz.vse.menza_api.models.MealsHistory;
import cz.vse.menza_api.models.Rating;
import cz.vse.menza_api.services.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/meals")
public class MealsController {

    MealService mealService;

    @Autowired
    public MealsController(MealService mealService) {
        this.mealService = mealService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Meal> getMeal(@PathVariable Long id) {
        Meal meal = this.mealService.getMealDetail(id);
        return ResponseEntity.ok(meal);
    }

    //TODO
    @GetMapping("/{id}/history")
    public ResponseEntity<List<MealsHistory>> getMealHistory(@PathVariable Long id) {
        return ResponseEntity.ok(Collections.emptyList());
    }

    //TODO
    @GetMapping("/{id}/allergens")
    public ResponseEntity<List<Alergen>> getMealAllergens(@PathVariable Long id) {
        return ResponseEntity.ok(Collections.emptyList());
    }

    //TODO
    @GetMapping("/{id}/rating")
    public ResponseEntity<RatingResponse> getMealRatings(@PathVariable Long id) {
        return ResponseEntity.ok(new RatingResponse(0L,0L));
    }
}
