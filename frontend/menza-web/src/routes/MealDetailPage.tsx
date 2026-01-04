import {useParams} from "react-router-dom";
import {useQuery} from '@tanstack/react-query';

import {getMeals} from '../api/meals/meals';
import MealsHistoryChart from "../components/ui/MealHistoryChart";
import type {Alergen} from '../api/models';
import type {Meal as MealResponse} from '../api/models/meal';
import type {RatingResponse} from '../api/models';
import type {MealsHistory} from "../api/models";
import {ThumbsUp, ThumbsDown,} from 'lucide-react';
import {RATINGS} from "../utils/constants.ts";
import {useMealRatingMutation} from "../hooks/useMealRatingMutation";
import {useCanteenStore} from "../store/store.ts";
import BackButton from "../components/BackButton.tsx";
import MealDetailSkeleton from "../components/ui/loaders/MealDetailSkeleton.tsx";

type MealDetail = MealResponse & RatingResponse & { allergens: string[], history: MealsHistory[] }


const {getMeal, getMealAllergens, getMealRatings, getMealHistory} = getMeals();

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
    const {id: mealId} = useParams<{ id: string }>();

    const idAsNumber = mealId ? parseInt(mealId, 10) : undefined;

    const mealQuery = useQuery({
        queryKey: ["mealDetails", idAsNumber],
        queryFn: async () => fetchAllMealData(idAsNumber!),
        enabled: !!idAsNumber,
    });

    const user = useCanteenStore((state) => state.user);
    const {handleRateClick} = useMealRatingMutation({mealId: idAsNumber!, userId: user?.id});

    if (mealQuery.isLoading) {
        return <MealDetailSkeleton/>;
    }

    if (mealQuery.isError) {
        return <div className="text-center p-8 text-red-600 font-bold">Error loading meal details: {(mealQuery.error as Error).message}</div>;
    }

    const meal = mealQuery.data;

    if (!meal) {
        return <div className="text-center p-8 text-gray-500 text-2xl">Jídlo nebylo nalezeno.</div>;
    }

    return (
        <div className="w-full mb-6">
            <BackButton/>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
                    <div className="lg:col-span-2 flex flex-col items-center">
                        <div className="w-full aspect-video overflow-hidden rounded-xl shadow-md">
                            <img
                                src={meal.imageUrl}
                                alt={meal.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex w-full items-center py-4 justify-around">
                            <button onClick={() => handleRateClick(RATINGS["LIKED"])}
                                    className="cursor-pointer hover:text-blue-600 transition-colors flex items-center justify-center flex-col group">
                                <ThumbsUp className="w-8 h-8 mb-1 group-hover:scale-110 transition-transform"/>
                                <strong className="text-lg">{meal.likes ?? 0}</strong>
                            </button>
                            <button onClick={() => handleRateClick(RATINGS["DISLIKED"])}
                                    className="cursor-pointer hover:text-red-600 transition-colors flex items-center justify-center flex-col group">
                                <ThumbsDown className="w-8 h-8 mb-1 group-hover:scale-110 transition-transform"/>
                                <strong className="text-lg">{meal.dislikes ?? 0}</strong>
                            </button>
                        </div>

                        <p className="font-bold text-2xl self-start lg:self-center mt-4 mb-2">Vývoj cen</p>
                        <div className="w-full pt-3" style={{maxWidth: 420}}>
                            <MealsHistoryChart history={meal.history} height={180}/>
                        </div>
                    </div>

                    <div className="lg:col-span-3 flex flex-col space-y-4">
                        <h1 className="font-bold text-4xl text-gray-900">{meal.name}</h1>
                        <div className="w-full sm:w-96 border-b border-gray-300"/>
                        <p className="mb-4 text-justify text-gray-700 leading-relaxed">{meal.description}</p>

                        {meal.history && (
                            <div className="w-full flex justify-end py-4">
                                <div
                                    className="bg-gray-50 border border-gray-200 rounded-lg w-48 flex p-4 justify-between items-center shadow-sm">
                                    <p className="font-semibold text-gray-600">Aktuální cena</p>
                                    <p className="font-bold text-xl text-blue-600">{meal.history.at(meal.history.length - 1)?.price},-</p>
                                </div>
                            </div>
                        )}

                        {/* Spodní sekce - Grid pro alergeny a nutriční hodnoty */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8 border-t pt-8 border-gray-100">
                            <div>
                                <h3 className="font-bold text-xl mb-4 flex items-center">
                                    Alergeny
                                </h3>
                                <ul className="pl-5 list-disc space-y-1 text-gray-700">
                                    {meal.allergens.map((allergen: string, index: number) => (
                                        <li key={index} className="font-medium">{allergen}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-xl mb-4">
                                    Výživové hodnoty <span
                                    className="text-base font-normal text-gray-500">(na {meal.weight}g)</span>
                                </h3>
                                <ul className="pl-5 list-disc space-y-1 text-gray-700">
                                    <li className="font-medium"><span className="font-bold">{meal.kcal}</span> KCal</li>
                                    <li className="font-medium"><span
                                        className="font-bold">{meal.proteins}g</span> bílkovin
                                    </li>
                                    <li className="font-medium"><span className="font-bold">{meal.fats}g</span> tuku
                                    </li>
                                    <li className="font-medium"><span
                                        className="font-bold">{meal.carbs}g</span> sacharidů
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}