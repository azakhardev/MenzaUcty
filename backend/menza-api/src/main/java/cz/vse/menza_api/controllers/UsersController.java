package cz.vse.menza_api.controllers;

import cz.vse.menza_api.dto.ApiErrorResponse;
import cz.vse.menza_api.dto.LoginCredentials;
import cz.vse.menza_api.dto.TopUpRequest;
import cz.vse.menza_api.models.Meal;
import cz.vse.menza_api.models.User;
import cz.vse.menza_api.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import cz.vse.menza_api.dto.history.UserHistoryItemDto;


import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/users")
@Tag(
        name = "Users",
        description = "Endpoints for user management, authentication, balance, and order history."
)
@ApiResponse(
        responseCode = "401",
        description = "Unauthorized - Invalid or missing token",
        content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ApiErrorResponse.class)
        )
)
public class UsersController {

    private final UserService userService;

    public UsersController(UserService userService) {
        this.userService = userService;
    }

    @Operation(
            summary = "Get all users",
            description = "Retrieves a list of all users.",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Users retrieved successfully",
                            content = @Content(array = @ArraySchema(schema = @Schema(implementation = User.class)))
                    )
            }
    )
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @Operation(
            summary = "Get user by ID",
            description = "Retrieves detailed information about a specific user by their ID.",
            parameters = {
                    @Parameter(name = "id", description = "User ID", required = true)
            },
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "User retrieved successfully",
                            content = @Content(schema = @Schema(implementation = User.class))
                    ),
                    @ApiResponse(responseCode = "404", description = "User not found", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
            }
    )
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(user);
    }

    @Operation(
            summary = "Get user balance",
            description = "Retrieves the current balance of a user by their ID.",
            parameters = {
                    @Parameter(name = "id", description = "User ID", required = true)
            },
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Balance retrieved successfully",
                            content = @Content(schema = @Schema(implementation = BigDecimal.class))
                    ),
                    @ApiResponse(responseCode = "404", description = "User not found", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
            }
    )
    @GetMapping("/{id}/balance")
    public ResponseEntity<BigDecimal> getUserBalance(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(user.getBalance());
    }

    @Operation(
            summary = "Get user meal history",
            description = "Retrieves a list of meals ordered by the user.",
            parameters = {
                    @Parameter(name = "id", description = "User ID", required = true)
            },
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "User meal history retrieved successfully",
                            content = @Content(array = @ArraySchema(schema = @Schema(implementation = UserHistoryItemDto.class)))
                    ),
                    @ApiResponse(responseCode = "404", description = "User not found", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
            }
    )
    @GetMapping("/{id}/history")
    public ResponseEntity<List<UserHistoryItemDto>> getUserHistory(@PathVariable Long id) {
        // Zavoláme opravenú metódu v Service, ktorá vracia DTO
        List<UserHistoryItemDto> history = userService.getUserHistory(id);
        return ResponseEntity.ok(history);
    }

    @Operation(
            summary = "Top up user balance",
            description = "Adds funds to the user's account balance.",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Top-up request containing user ID and amount",
                    required = true,
                    content = @Content(schema = @Schema(implementation = TopUpRequest.class))
            ),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Balance topped up successfully",
                            content = @Content(schema = @Schema(implementation = BigDecimal.class))
                    ),
                    @ApiResponse(responseCode = "404", description = "User not found", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)) ),
                    @ApiResponse(responseCode = "400", description = "Invalid top-up amount", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
            }
    )
    @PostMapping("/topup")
    public ResponseEntity<BigDecimal> topUp(@RequestBody TopUpRequest topUp) {
        BigDecimal newBalance = userService.topUpBalance(topUp.getUserId(), topUp.getAmount());
        return ResponseEntity.ok(newBalance);
    }
}
