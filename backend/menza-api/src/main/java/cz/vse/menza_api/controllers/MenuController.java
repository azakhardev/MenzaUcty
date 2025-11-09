package cz.vse.menza_api.controllers;

import cz.vse.menza_api.dto.menu.BuffetMenu;
import cz.vse.menza_api.dto.menu.DailyMenu;
import cz.vse.menza_api.exceptions.ResourceNotFoundException;
import cz.vse.menza_api.services.MenuService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;

@RestController
@RequestMapping("/menu")
public class MenuController {

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping("/{canteen}/{date}")
    public ResponseEntity<DailyMenu> getMenu(@PathVariable String canteen, @PathVariable String date) {
        try {
            LocalDate parsedDate = LocalDate.parse(date);
            DailyMenu menu = menuService.getMenuForDay(parsedDate, canteen);
            if (menu == null) {
                throw new ResourceNotFoundException("Menu for this date was not found");
            }
            return ResponseEntity.ok(menu);
        } catch (DateTimeParseException e) {
            throw new ResourceNotFoundException("Invalid date format");
        }
    }

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
