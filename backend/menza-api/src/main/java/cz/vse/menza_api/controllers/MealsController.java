package cz.vse.menza_api.controllers;

import cz.vse.menza_api.dto.ApiErrorResponse;
import cz.vse.menza_api.dto.RatingResponse;
import cz.vse.menza_api.models.Alergen;
import cz.vse.menza_api.models.Meal;
import cz.vse.menza_api.models.MealsHistory;
import cz.vse.menza_api.models.Rating;
import cz.vse.menza_api.models.enums.RatingType;
import cz.vse.menza_api.services.MealService;
import cz.vse.menza_api.services.RatingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/meals")
@Tag(
        name = "Meals",
        description = "Endpoints for retrieving meal details, history, allergens, and ratings."
)
@ApiResponse(
        responseCode = "401",
        description = "Unauthorized - Invalid or missing token",
        content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ApiErrorResponse.class)
        )
)
public class MealsController {

    private final MealService mealService;
    private final RatingService ratingService;

    @Autowired
    public MealsController(MealService mealService, RatingService ratingService) {
        this.mealService = mealService;
        this.ratingService = ratingService;
    }

    @Operation(
            summary = "Get all meals",
            description = "Retrieves a list of all meals available in the database.",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "List of meals retrieved successfully",
                            content = @Content(array = @ArraySchema(schema = @Schema(implementation = Meal.class)))
                    )
            }
    )
    @GetMapping
    public ResponseEntity<List<Meal>> getAllMeals() {
        List<Meal> meals = mealService.getAllMeals();
        return ResponseEntity.ok(meals);
    }

    @Operation(
            summary = "Get meal details",
            description = "Retrieves detailed information about a specific meal by its ID.",
            parameters = {
                    @Parameter(name = "id", description = "Meal ID", required = true)
            },
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Meal details retrieved successfully",
                            content = @Content(schema = @Schema(implementation = Meal.class))
                    ),
                    @ApiResponse(responseCode = "404", description = "Meal not found")
            }
    )
    @GetMapping("/{id}")
    public ResponseEntity<Meal> getMeal(@PathVariable Long id) {
        Meal meal = this.mealService.getMealDetail(id);
        return ResponseEntity.ok(meal);
    }

    @Operation(
            summary = "Get meal history",
            description = "Retrieves the historical price and availability data for a specific meal.",
            parameters = {
                    @Parameter(name = "id", description = "Meal ID", required = true)
            },
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Meal history retrieved successfully",
                            content = @Content(array = @ArraySchema(schema = @Schema(implementation = MealsHistory.class)))
                    ),
                    @ApiResponse(responseCode = "404", description = "Meal not found", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
            }
    )
    @GetMapping("/{id}/history")
    public ResponseEntity<List<MealsHistory>> getMealHistory(@PathVariable Long id) {
        List<MealsHistory> history = mealService.getMealHistory(id);
        return ResponseEntity.ok(history);
    }

    @Operation(
            summary = "Get meal allergens",
            description = "Returns a list of allergens associated with a specific meal.",
            parameters = {
                    @Parameter(name = "id", description = "Meal ID", required = true)
            },
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "List of allergens retrieved successfully",
                            content = @Content(array = @ArraySchema(schema = @Schema(implementation = Alergen.class)))
                    ),
                    @ApiResponse(responseCode = "404", description = "Meal not found",content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
            }
    )
    @GetMapping("/{id}/allergens")
    public ResponseEntity<List<Alergen>> getMealAllergens(@PathVariable Long id) {
        List<Alergen> alergens = mealService.getMealAllergens(id);
        return ResponseEntity.ok(alergens);
    }

    @Operation(
            summary = "Get meal ratings",
            description = "Returns the number of likes and dislikes for a specific meal.",
            parameters = {
                    @Parameter(name = "id", description = "Meal ID", required = true)
            },
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Meal ratings retrieved successfully",
                            content = @Content(schema = @Schema(implementation = RatingResponse.class))
                    ),
                    @ApiResponse(responseCode = "404", description = "Meal not found or has no ratings", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
            }
    )
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
