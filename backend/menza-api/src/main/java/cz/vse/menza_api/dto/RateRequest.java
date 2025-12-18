package cz.vse.menza_api.dto;

public class RateRequest {
    private Long mealId;
    private Long userId;
    private String rating;

    public RateRequest(Long mealId, String rating, Long userId) {
        this.mealId = mealId;
        this.rating = rating;
        this.userId = userId;
    }

    public Long getMealId() {
        return mealId;
    }

    public void setMealId(Long mealId) {
        this.mealId = mealId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String amount) {
        this.rating = rating;
    }
}
