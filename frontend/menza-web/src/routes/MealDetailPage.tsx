import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'; 

import { getMeals } from '../api/meals/meals'; 
import type { Alergen } from '../api/models/alergen'; 
import type { Meal as MealResponse } from '../api/models/meal'; 
import type { RatingResponse } from '../api/models/ratingResponse'; 

interface MealDetail {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    weight: number;
    kcal: number;
    fats: number;
    proteins: number;
    carbs: number;
    category: string;
    allergens: string[]; 
    likes: number; 
    dislikes: number;
}

const { getMeal, getMealAllergens, getMealRatings } = getMeals();


const fetchAllMealData = async (mealId: number): Promise<MealDetail> => {
    const [meal, allergens, ratings] = await Promise.all([
        getMeal(mealId) as Promise<MealResponse>, 
        getMealAllergens(mealId) as Promise<Alergen[]>, 
        getMealRatings(mealId) as Promise<RatingResponse>
    ]);

    return {
        id: meal.id || 0,
        name: meal.name || "",
        description: meal.description || "",
        imageUrl: meal.imageUrl || "",
        weight: meal.weight || 0,
        kcal: meal.kcal || 0,
        fats: meal.fats || 0,
        proteins: meal.proteins || 0,
        carbs: meal.carbs || 0,
        category: meal.category || "",
        allergens: allergens.map((a: Alergen) => a.name || "Neznámý alergen"), 
        likes: ratings.likes || 0, 
        dislikes: ratings.dislikes || 0,
    };
};

export default function MealDetailPage() {
    const { id: mealId } = useParams<{ id: string }>();
    
    const idAsNumber = mealId ? parseInt(mealId, 10) : undefined;

    const mealQuery = useQuery({
        queryKey: ["mealDetails", idAsNumber], 
        queryFn: async () => fetchAllMealData(idAsNumber!),
        enabled: !!idAsNumber, 
    });

    if (mealQuery.isLoading) {
        return <div>Loading details...</div>;
    }

    if (mealQuery.isError) {
        return <div>Error loading meal details: {(mealQuery.error as Error).message}</div>;
    }
    
    const meal = mealQuery.data;

    if (!meal) {
        return <div>Jídlo nebylo nalezeno.</div>;
    }

    return (
        <div className="meal-detail-container">
            <div className="meal-content">
                <div className="meal-image-section">
                    <img src={meal.imageUrl} alt={meal.name} />
                    <div className="feedback-stats">
                        <span>👍 {meal.likes}</span>
                        <span>👎 {meal.dislikes}</span>
                    </div>
                    <div className="price-chart-placeholder">Vývoj cen</div>
                </div>

                <div className="meal-info-section">
                    <h1>{meal.name}</h1>
                    <p className="description">{meal.description}</p>

                    <h3>Alergeny</h3>
                    <ul className="allergens-list">
                        {meal.allergens.map((allergen: string, index: number) => (
                            <li key={index}>{allergen}</li>
                        ))}
                    </ul>

                    <h3>Výživové hodnoty (na {meal.weight}g)</h3>
                    <ul className="nutritional-values-list">
                        <li>~{meal.kcal} kCal</li>
                        <li>{meal.proteins} g bílkovin</li>
                        <li>{meal.fats} g tuku</li>
                        <li>{meal.carbs} g sacharidů</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}