package cz.vse.menza_api.controllers;

import cz.vse.menza_api.dto.ApiErrorResponse;
import cz.vse.menza_api.dto.menu.BuffetMenu;
import cz.vse.menza_api.dto.menu.DailyMenuResponse;
import cz.vse.menza_api.dto.menu.WeeklyMenu;
import cz.vse.menza_api.exceptions.ResourceNotFoundException;
import cz.vse.menza_api.services.MenuService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;

@RestController
@RequestMapping("/menu")
@Tag(
        name = "Menu",
        description = "Endpoints for retrieving weekly, daily, and buffet menus for different canteens."
)
public class MenuController {

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @Operation(
            summary = "Get weekly menu",
            description = "Retrieves the weekly menu for the specified canteen.",
            parameters = {
                    @Parameter(name = "canteen", description = "Canteen identifier", required = true)
            },
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Weekly menu retrieved successfully",
                            content = @Content(schema = @Schema(implementation = WeeklyMenu.class))
                    ),
                    @ApiResponse(responseCode = "404", description = "Canteen or menu not found", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
            }
    )
    @GetMapping("{canteen}")
    public ResponseEntity<WeeklyMenu> getMenu(@PathVariable String canteen) {
        WeeklyMenu menu = menuService.getWeeklyMenu(canteen);
        return ResponseEntity.ok(menu);
    }

    @Operation(
            summary = "Get daily menu",
            description = "Retrieves the daily menu for a specific canteen and date.",
            parameters = {
                    @Parameter(name = "canteen", description = "Canteen identifier", required = true),
                    @Parameter(name = "date", description = "Date in format YYYY-MM-DD", required = true)
            },
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Daily menu retrieved successfully",
                            content = @Content(schema = @Schema(implementation = DailyMenuResponse.class))
                    ),
                    @ApiResponse(responseCode = "404", description = "Menu not found for this date or invalid date format", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
            }
    )
    @GetMapping("/{canteen}/{date}")
    public ResponseEntity<DailyMenuResponse> getMenu(
            @PathVariable String canteen,
            @PathVariable String date
    ) {
        try {
            LocalDate parsedDate = LocalDate.parse(date);
            DailyMenuResponse menu = menuService.getMenuForDay(parsedDate, canteen);
            if (menu == null) {
                throw new ResourceNotFoundException("Menu for this date was not found");
            }
            return ResponseEntity.ok(menu);
        } catch (DateTimeParseException e) {
            throw new ResourceNotFoundException("Invalid date format");
        }
    }

    @Operation(
            summary = "Get buffet menu",
            description = "Retrieves the buffet menu for a specific canteen.",
            parameters = {
                    @Parameter(name = "canteen", description = "Canteen identifier", required = true)
            },
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Buffet menu retrieved successfully",
                            content = @Content(schema = @Schema(implementation = BuffetMenu.class))
                    ),
                    @ApiResponse(responseCode = "404", description = "Buffet menu not found or invalid canteen name", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
            }
    )
    @GetMapping("/{canteen}/buffet")
    public ResponseEntity<BuffetMenu> getBuffetMenu(@PathVariable String canteen) {
        try {
            BuffetMenu menu = menuService.getBuffetMenu(canteen);
            if (menu == null) {
                throw new ResourceNotFoundException("Buffet menu for this canteen was not found");
            }
            return ResponseEntity.ok(menu);
        } catch (DateTimeParseException e) {
            throw new ResourceNotFoundException("Invalid canteen name");
        }
    }
}
