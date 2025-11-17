package cz.vse.menza_api.services;
import cz.vse.menza_api.exceptions.ResourceNotFoundException;
import cz.vse.menza_api.models.Rating;
import cz.vse.menza_api.repositories.RatingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {
    private final RatingRepository ratingRepository;

    public RatingService(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    public List<Rating> getRatingsByMealId(Long id) {
        List<Rating> ratings = ratingRepository.getRatingsByMeal_Id(id);

        if(ratings.isEmpty()) {
            throw new ResourceNotFoundException("Meal doesnt have ratings");
        }

        return ratings;
    }

}
