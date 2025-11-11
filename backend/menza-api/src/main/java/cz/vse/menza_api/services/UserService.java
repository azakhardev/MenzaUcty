package cz.vse.menza_api.services;

import cz.vse.menza_api.exceptions.InvalidCredentialsException;
import cz.vse.menza_api.exceptions.ResourceNotFoundException;
import cz.vse.menza_api.models.User;
import cz.vse.menza_api.models.Meal;
import cz.vse.menza_api.models.OrdersHistory;
import cz.vse.menza_api.repositories.OrderHistoryRepository;
import java.util.stream.Collectors;
import cz.vse.menza_api.repositories.UserRepository;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final OrderHistoryRepository ordersHistoryRepository;

    public UserService(UserRepository userRepository, OrderHistoryRepository ordersHistoryRepository) {
        this.userRepository = userRepository;
        this.ordersHistoryRepository = ordersHistoryRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

//    public User createUser(User user) {
//        return userRepository.save(user);
//    }
//
//    public User updateUser(Long id, User updatedUser) {
//        return userRepository.findById(id)
//                .map(user -> {
//                    user.setUsername(updatedUser.getUsername());
//                    user.setPassword(updatedUser.getPassword());
//                    user.setBalance(updatedUser.getBalance());
//                    return userRepository.save(user);
//                })
//                .orElse(null);
//    }

    public User login(String username, String password) throws Exception {
        User user = userRepository.getUserByUsername(username);

        if (user == null) {
            throw new ResourceNotFoundException("User not found");
        }

        if(user.getPassword().equals(password)) {
            return user;
        }

        throw new InvalidCredentialsException("Invalid username or password");
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public BigDecimal topUpBalance(Long userId, BigDecimal amountToAdd) throws ResourceNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        if (amountToAdd == null || amountToAdd.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Top-up amount must be positive.");
        }

        BigDecimal currentBalance = user.getBalance() != null ? user.getBalance() : BigDecimal.ZERO;

        BigDecimal newBalance = currentBalance.add(amountToAdd);

        user.setBalance(newBalance);
        userRepository.save(user);

        return newBalance;
    }

    public List<Meal> getUserHistory(Long userId) throws ResourceNotFoundException {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }

        List<OrdersHistory> historyRecords = ordersHistoryRepository.findByUserId(userId);

        return historyRecords.stream()
                .map(OrdersHistory::getMeal)
                .collect(Collectors.toList());
    }
}
