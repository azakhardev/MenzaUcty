package cz.vse.menza_api.services;
import cz.vse.menza_api.exceptions.ResourceNotFoundException;
import cz.vse.menza_api.models.Meal;
import cz.vse.menza_api.models.Rating;
import cz.vse.menza_api.models.User;
import cz.vse.menza_api.models.enums.RatingType;
import cz.vse.menza_api.repositories.MealRepository;
import cz.vse.menza_api.repositories.RatingRepository;
import cz.vse.menza_api.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {
    private final RatingRepository ratingRepository;
    private final MealRepository mealRepository;
    private final UserRepository userRepository;

    public RatingService(RatingRepository ratingRepository, MealRepository mealRepository,
                         UserRepository userRepository) {
        this.ratingRepository = ratingRepository;
        this.mealRepository = mealRepository;
        this.userRepository = userRepository;
    }

    public List<Rating> getRatingsByMealId(Long id) {
        return ratingRepository.getRatingsByMeal_Id(id);
    }

    private Meal getMealById(Long mealId) {
        return mealRepository.findById(mealId)
                .orElseThrow(() -> new ResourceNotFoundException("Meal not found with id: " + mealId));
    }

    private User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }

    public String rate(Long mealId, Long userId, String rating) {
        if (rating == null || rating.trim().isEmpty()) {
            throw new IllegalArgumentException("Invalid rating type. Cannot be null or empty.");
        }

        Meal meal = getMealById(mealId);
        User user = getUserById(userId);

        RatingType ratingType;
        try {
            ratingType = RatingType.valueOf(rating.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid rating type string: " + rating + ". Must be one of the defined RatingType enums (e.g., 'LIKE', 'DISLIKE').", e);
        }

        Rating newRating = new Rating();
        newRating.setMeal(meal);
        newRating.setUser(user);
        newRating.setRating(ratingType);
        ratingRepository.save(newRating);

        return rating;
    }
}
