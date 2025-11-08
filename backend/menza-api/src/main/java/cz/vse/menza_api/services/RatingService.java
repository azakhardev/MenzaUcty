package cz.vse.menza_api.services;
import cz.vse.menza_api.exceptions.ResourceNotFoundException;
import cz.vse.menza_api.models.Rating;
import cz.vse.menza_api.repositories.RatingRepository;

public class RatingService {
    private final RatingRepository ratingRepository;

    public RatingService(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    public Rating getRatingById(Long id) {
        Rating rating = ratingRepository.getRatingById(id);

        if(rating == null) {
            throw new ResourceNotFoundException("Meal not found");
        }

        return rating;
    }

}
