import {useParams} from "react-router";

export default function MealDetailPage() {
    const params = useParams();
    const mealId = params.id;

    return <div>FoodDetailPage for food with id {mealId}  </div>
}