package cz.vse.menza_api.repositories;

import cz.vse.menza_api.models.MealsHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

@Repository
public interface MealsHistoryRepository extends JpaRepository<MealsHistory, Long> {
    @Query("SELECT mh FROM MealsHistory mh WHERE mh.meal.id = :mealId ORDER BY mh.date ASC")
    List<MealsHistory> findByMeal_Id(Long mealId);
}