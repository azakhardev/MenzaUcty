package cz.vse.menza_api.controllers;

import cz.vse.menza_api.services.MenuService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/menu")
public class MenuController {

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping("/raw")
    public ResponseEntity<String> getRawMenu(){
        return ResponseEntity.ok( menuService.getRawMenu());
    }

//    @GetMapping("/{date}")
//    public ResponseEntity<?> getMenu(@PathVariable String date) {
//        try {
//            LocalDate parsedDate = LocalDate.parse(date);
//            MenuDay menu = menuService.getMenuByDate(parsedDate);
//            if (menu == null) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                        .body(Map.of("message", "Menu not found for date " + date));
//            }
//            return ResponseEntity.ok(menu);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                    .body(Map.of("message", "Invalid date format, use yyyy-MM-dd"));
//        }
//    }
}
