import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'; 

import { getMeals } from '../api/meals/meals';
import LabeledImage from "../components/ui/LabeledImage";
import MealsHistoryChart from "../components/ui/MealHistoryChart";
import type { Alergen } from '../api/models/alergen';
import type { Meal as MealResponse } from '../api/models/meal'; 
import type { RatingResponse } from '../api/models/ratingResponse';
import type { MealsHistory } from "../api/models";
import { useNavigate } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, MoveLeft } from 'lucide-react';
import { RATINGS } from "../utils/constants.ts";
import { useMealRatingMutation } from "../hooks/useMealRatingMutation";
import { useCanteenStore } from "../store/store.ts";

type MealDetail = MealResponse & RatingResponse & { allergens: string[], history: MealsHistory[] }


const { getMeal, getMealAllergens, getMealRatings, getMealHistory } = getMeals();

const fetchAllMealData = async (mealId: number): Promise<MealDetail> => {
    const [meal, allergens, ratings, history] = await Promise.all([
        getMeal(mealId), 
        getMealAllergens(mealId), 
        getMealRatings(mealId),
        getMealHistory(mealId),
    ]);

    return {
        ...meal,
        ...ratings,
        allergens: allergens.map((a: Alergen) => a.name || "Neznámý alergen"), 
        history,
    };
};

export default function MealDetailPage() {
    const { id: mealId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    const idAsNumber = mealId ? parseInt(mealId, 10) : undefined;

    const mealQuery = useQuery({
        queryKey: ["mealDetails", idAsNumber], 
        queryFn: async () => fetchAllMealData(idAsNumber!),
        enabled: !!idAsNumber, 
    });

    const user = useCanteenStore((state) => state.user);
    const { handleRateClick } = useMealRatingMutation({ mealId: idAsNumber!, userId: user?.id });

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
        <div className="w-full mb-6 flex-col justify-center">
            <div className="flex px-6 pt-2">
                <div className="w-12 h-12 cursor-pointer" onClick={() => navigate(-1)}>
                    <MoveLeft />
                </div>
            </div>
            <div className="flex flex-row px-16 space-x-20">
                <div className="flex flex-col w-2/5 items-center">
                    <div className="w-full h-60 rounded-lg bg-cover" style={{backgroundImage: "url("+meal.imageUrl+")"}} />
                    <div className="flex w-full items-center py-2">
                        <LabeledImage className="w-1/2" PropIcon={ThumbsUp} label={meal.likes} callback={() => handleRateClick(RATINGS["LIKED"])}/>
                        <LabeledImage className="w-1/2" PropIcon={ThumbsDown} label={meal.dislikes} callback={() => handleRateClick(RATINGS["DISLIKED"])}/>
                    </div>
                    <p className="font-bold text-2xl">Vývoj cen</p>
                    <div className="w-full pt-3" style={{ maxWidth: 420 }}>
                        <MealsHistoryChart history={meal.history} height={180}/>
                    </div>
                </div>
                <div className="flex flex-col w-3/5 space-y-2">
                    <p className="font-bold text-4xl">{meal.name}</p>
                    <div className="w-96 border"/>
                    <p className="mb-4 text-justify">{meal.description}</p>
                    {meal.history &&
                        <div className="w-full flex justify-end">
                            <div className="bg-[#F2F2F2] border rounded-md w-40 flex p-3 justify-between">
                                <p className="font-bold">Cena</p>
                                <p className="font-bold">{meal.history.at(meal.history.length - 1)?.price},-</p>
                            </div>
                        </div>
                    }
                    <p className="font-bold text-xl mt-2">Alergeny</p>
                    <div className="pl-8">
                        {meal.allergens.map((allergen: string, index: number) => (
                            <li key={index} className="font-bold">{allergen}</li>
                        ))}
                    </div>
                    <p className="font-bold text-xl mt-4">Výživové hodnoty (na {meal.weight}g)</p>
                    <div className="pl-8">
                        <li className="font-bold">~{meal.kcal} KCal</li>
                        <li className="font-bold">{meal.proteins}g bílkovin</li>
                        <li className="font-bold">{meal.fats}g tuku</li>
                        <li className="font-bold">{meal.carbs}g sacharidů</li>
                    </div>
                </div>
            </div>
        </div>
    );
}