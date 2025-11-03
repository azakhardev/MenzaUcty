package cz.vse.menza_api.models;

import java.io.Serializable;
import java.util.Objects;

public class MealsAlergensId implements Serializable {
    private Long meal;
    private Long alergen;

    public MealsAlergensId() {}

    public MealsAlergensId(Long meal, Long alergen) {
        this.meal = meal;
        this.alergen = alergen;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MealsAlergensId that)) return false;
        return Objects.equals(meal, that.meal) && Objects.equals(alergen, that.alergen);
    }

    @Override
    public int hashCode() {
        return Objects.hash(meal, alergen);
    }
}
