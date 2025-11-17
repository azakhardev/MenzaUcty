package cz.vse.menza_api.dto;

public class RatingResponse {
    private Long likes;

    private Long dislikes;

    public RatingResponse(Long likes, Long dislikes) {
        this.likes = likes;
        this.dislikes = dislikes;
    }

    public Long getLikes() {
        return likes;
    }

    public void setLikes(Long likes) {
        this.likes = likes;
    }

    public Long getDislikes() {
        return dislikes;
    }

    public void setDislikes(Long dislikes) {
        this.dislikes = dislikes;
    }
}
