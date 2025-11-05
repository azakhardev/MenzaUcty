package cz.vse.menza_api.dto.menu;

import java.time.LocalDate;
import java.util.List;

public class WeekMenu {
    private LocalDate startDate;
    private LocalDate endDate;
    private List<MenuDay> days;
}