package cz.vse.menza_api.repositories;

import cz.vse.menza_api.models.MealsHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MealsHistoryRepository extends JpaRepository<MealsHistory, Long> {
    List<MealsHistory> findByMeal_Id(Long mealId);
}