package cz.vse.menza_api.controllers;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import cz.vse.menza_api.dto.PaymentRequest;
import cz.vse.menza_api.dto.PaymentResponse;
import cz.vse.menza_api.models.User;
import cz.vse.menza_api.repositories.UserRepository;
import cz.vse.menza_api.services.JwtService;
import cz.vse.menza_api.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import jakarta.annotation.PostConstruct;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    private final UserService userService;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @Autowired
    public PaymentController(UserService userService, JwtService jwtService, UserRepository userRepository) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    // Inicializace Stripe API klíče při startu aplikace
    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }

    @PostMapping("/create-payment")
    public PaymentResponse createPaymentIntent(@RequestHeader("Authorization") String authHeader, @RequestBody PaymentRequest request) throws StripeException {

        // Vytvoření parametrů pro platbu
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(request.getAmount()) // Částka v nejmenších jednotkách (haléře/centy)
                .setCurrency("czk")
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                .setEnabled(true)
                                .build()
                )
                .build();

        // Zavolání Stripe API
        PaymentIntent paymentIntent = PaymentIntent.create(params);

        // Vrácení clientSecret frontendu
        return new PaymentResponse(paymentIntent.getClientSecret());
    }


}