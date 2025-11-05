package cz.vse.menza_api.dto.menu;

import java.time.LocalDate;
import java.util.List;

public class MenuDay {
    private LocalDate date;
    private List<Long> mainCourses;
    private List<Long> soups;
    private List<Long> buffet;
    private List<Long> drinks;
}
