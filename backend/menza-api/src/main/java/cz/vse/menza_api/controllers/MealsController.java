package cz.vse.menza_api.controllers;

import cz.vse.menza_api.dto.RatingResponse;
import cz.vse.menza_api.models.Alergen;
import cz.vse.menza_api.models.Meal;
import cz.vse.menza_api.models.MealsHistory;
import cz.vse.menza_api.models.Rating;
import cz.vse.menza_api.models.enums.RatingType;
import cz.vse.menza_api.services.MealService;
import cz.vse.menza_api.services.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/meals")
public class MealsController {

    MealService mealService;
    RatingService ratingService;

    @Autowired
    public MealsController(MealService mealService, RatingService ratingService) {
        this.mealService = mealService;
        this.ratingService = ratingService;
    }

    @GetMapping
    public ResponseEntity<List<Meal>> getAllMeals() {
        List<Meal> meals = mealService.getAllMeals();
        return ResponseEntity.ok(meals);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Meal> getMeal(@PathVariable Long id) {
        Meal meal = this.mealService.getMealDetail(id);
        return ResponseEntity.ok(meal);
    }


    @GetMapping("/{id}/history")
    public ResponseEntity<List<MealsHistory>> getMealHistory(@PathVariable Long id) {
        List<MealsHistory> history = mealService.getMealHistory(id);
        return ResponseEntity.ok(history);
    }

    @GetMapping("/{id}/allergens")
    public ResponseEntity<List<Alergen>> getMealAllergens(@PathVariable Long id) {
        List<Alergen> alergens = mealService.getMealAllergens(id);
        return ResponseEntity.ok(alergens);
    }

    @GetMapping("/{id}/rating")
    public ResponseEntity<RatingResponse> getMealRatings(@PathVariable Long id) {
        List<Rating> ratings = ratingService.getRatingsByMealId(id);

        long likes = ratings.stream()
                .filter(r -> r.getRating() == RatingType.LIKED)
                .count();

        long dislikes = ratings.stream()
                .filter(r -> r.getRating() == RatingType.DISLIKED)
                .count();

        return ResponseEntity.ok(new RatingResponse(likes, dislikes));
    }
}
