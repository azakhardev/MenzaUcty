import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getMeals } from '../api/meals/meals';
import { RATINGS } from "../utils/constants.ts";
import type { RateRequest } from "../api/models";

const { rate } = getMeals();

interface UseMealRatingMutationProps {
  mealId: number;
  userId: number | undefined;
}

export function useMealRatingMutation({ mealId, userId}: UseMealRatingMutationProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (rateType: typeof RATINGS[keyof typeof RATINGS]) => {
      const data: RateRequest = {
        mealId: mealId,
        userId: userId,
        rating: rateType,
      };
      return await rate(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mealDetails', mealId] });
      console.log('Rating submitted successfully!');
    },
    onError: (error: Error) => {
      console.error('Rating failed:', error.message);
    },
  });

  const handleRateClick = (rateType: typeof RATINGS[keyof typeof RATINGS]) => {
    if (mealId === undefined || userId === undefined) {
      console.warn('Attempted to rate a meal without a valid Meal ID or User ID. Mutation aborted.');
      return;
    }

    mutation.mutate(rateType);
  };

  return {
    handleRateClick,
    isPending: mutation.isPending,
  };
}