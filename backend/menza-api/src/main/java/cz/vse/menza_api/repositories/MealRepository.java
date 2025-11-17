package cz.vse.menza_api.repositories;

import cz.vse.menza_api.models.Alergen;
import cz.vse.menza_api.models.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {

    @Query("SELECT a FROM MealsAlergens ma JOIN ma.alergen a WHERE ma.meal.id = :mealId")
    List<Alergen> findMealAlergens(@Param("mealId") Long mealId);
}
