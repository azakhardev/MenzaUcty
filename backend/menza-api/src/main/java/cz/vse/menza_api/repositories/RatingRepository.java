package cz.vse.menza_api.repositories;

import cz.vse.menza_api.models.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    Rating getRatingById(Long mealId);
}