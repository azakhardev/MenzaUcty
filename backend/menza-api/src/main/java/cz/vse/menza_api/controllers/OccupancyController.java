package cz.vse.menza_api.controllers;

import cz.vse.menza_api.dto.ApiErrorResponse;
import cz.vse.menza_api.dto.OccupancyResponseDto;
import cz.vse.menza_api.services.OccupancyService;
import cz.vse.menza_api.exceptions.ResourceNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/occupancy")
@Tag(name = "Canteen Occupancy", description = "Retrieve current occupancy data for canteens by day and hour.")
@ApiResponse(
        responseCode = "401",
        description = "Unauthorized - Invalid or missing token",
        content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ApiErrorResponse.class)
        )
)
public class OccupancyController {

    private final OccupancyService occupancyService;

    @Autowired
    public OccupancyController(OccupancyService occupancyService) {
        this.occupancyService = occupancyService;
    }

    @GetMapping("/{canteen}")
    @Operation(summary = "Gets current canteen occupancy data",
            description = "Returns data on the number of people in the canteen, broken down by day of the week and hour. Data is read from the canteen's JSON file.",
            parameters = {
                    @Parameter(name = "canteen", description = "Canteen identifier (e.g., 'menza-a', 'menza-b').", required = true)
            })
    @ApiResponse(responseCode = "200", description = "Successful retrieval of occupancy data.",
            content = @Content(schema = @Schema(implementation = OccupancyResponseDto.class)))
    @ApiResponse(responseCode = "404", description = "The canteen with the given identifier was not found.",
            content = @Content(schema = @Schema(example = "{\"timestamp\": \"...\", \"status\": 404, \"error\": \"Not Found\", \"message\": \"The specified canteen does not exist\"}")))
    @ApiResponse(responseCode = "500", description = "Error processing the data file.",
            content = @Content(schema = @Schema(example = "{\"timestamp\": \"...\", \"status\": 500, \"error\": \"Internal Server Error\", \"message\": \"Error loading occupancy: ...\"}")))
    public OccupancyResponseDto getOccupancy(@PathVariable("canteen") String canteen) {
        return occupancyService.getOccupancy(canteen);
    }
}