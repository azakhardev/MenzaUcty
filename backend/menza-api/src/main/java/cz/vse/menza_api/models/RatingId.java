package cz.vse.menza_api.models;

import java.io.Serializable;
import java.util.Objects;

public class RatingId implements Serializable {
    private Long meal;
    private Long user;

    public RatingId() {}

    public RatingId(Long meal, Long user) {
        this.meal = meal;
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RatingId that)) return false;
        return Objects.equals(meal, that.meal) && Objects.equals(user, that.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(meal, user);
    }
}
