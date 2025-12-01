package cz.vse.menza_api.dto;

import io.swagger.v3.oas.annotations.media.Schema; // Added import for Schema

import java.util.Map;

@Schema(description = "Data transfer object for returning weekly canteen occupancy.")
public class OccupancyResponseDto {

    public enum DayOfWeek {
        MON,
        TUE,
        WED,
        THU,
        FRI,
        SAT,
        SUN
    }

    @Schema(description = "A map of occupancy where the key is the day of the week (MON-SUN) and the value is another map (hour:number of people amount).",
            example = """
                    {
                      "occupancy": {
                        "MON": {
                          "12": 150,
                          "13": 120
                        },
                        "TUE": {
                          "12": 160
                        }
                      }
                    }
                    """)
    private Map<DayOfWeek, Map<Integer, Integer>> occupancy;

    public OccupancyResponseDto() {

    }

    public OccupancyResponseDto(Map<DayOfWeek, Map<Integer, Integer>> occupancy) {
        this.occupancy = occupancy;
    }

    public Map<DayOfWeek, Map<Integer, Integer>> getOccupancy() {
        return occupancy;
    }

    public void setOccupancy(Map<DayOfWeek, Map<Integer, Integer>> occupancy) {
        this.occupancy = occupancy;
    }
}