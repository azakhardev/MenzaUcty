package cz.vse.menza_api.services;

import cz.vse.menza_api.exceptions.InvalidCredentialsException;
import cz.vse.menza_api.exceptions.ResourceNotFoundException;
import cz.vse.menza_api.models.User;
import cz.vse.menza_api.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setUsername(updatedUser.getUsername());
                    user.setPassword(updatedUser.getPassword());
                    user.setBalance(updatedUser.getBalance());
                    return userRepository.save(user);
                })
                .orElse(null);
    }

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
}
