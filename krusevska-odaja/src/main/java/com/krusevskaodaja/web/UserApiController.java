package com.krusevskaodaja.web;

import com.krusevskaodaja.model.ApiResponsive.ApiResponse;
import com.krusevskaodaja.model.UtilDTO.EditProfileDTO;
import com.krusevskaodaja.model.UserProfile;
import com.krusevskaodaja.model.UtilDTO.LogInDTO;
import com.krusevskaodaja.model.UtilDTO.PasswordChangeDTO;
import com.krusevskaodaja.model.UtilDTO.SignUpDTO;
import com.krusevskaodaja.repository.JpaUserRepository;
import com.krusevskaodaja.service.InterfaceImpl.UserServiceImpl;
import com.krusevskaodaja.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/users", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class UserApiController {

    private final UserService userService;
    private final JpaUserRepository userRepository;

    public UserApiController(UserServiceImpl userService, JpaUserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> createProfile(@RequestBody SignUpDTO newProfile) {
        if (userRepository.existsByEmail(newProfile.getEmail())) {
            // UserEmailAlreadyInUseException
            return new ResponseEntity<>(new ApiResponse(false, "Email address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }
        if (userRepository.existsByUsername(newProfile.getUsername())) {
            // UserNameAlreadyInUseException
            return new ResponseEntity<>(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }
        int check = 312;
        if ((check = userService.createProfile(newProfile)) != 1) {
            // UserPhoneAlreadyInUseException
            return new ResponseEntity<>(new ApiResponse(false, "Phone number already in use!" + check),
                    HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(new ApiResponse(true, "User registration successfully!"),
                    HttpStatus.OK);
        }
    }

    @PostMapping("/log-in")
    public ResponseEntity<?> logIn(@RequestBody LogInDTO userData) {
        if (userData.getUsernameOrEmail().contains("@")) {
            if (!userRepository.existsByEmail(userData.getUsernameOrEmail())) {
                // UserEmailNotValidException
                return new ResponseEntity<>(new ApiResponse(false, "Invalid email! Please try again."),
                        HttpStatus.BAD_REQUEST);
            }
        } else {
            if (!userRepository.existsByUsername(userData.getUsernameOrEmail())) {
                // UserNameNotValidException
                return new ResponseEntity<>(new ApiResponse(false, "Invalid username! Please try again."),
                        HttpStatus.BAD_REQUEST);
            }
        }
        UserProfile dto = userService.logInUser(userData);
        if (dto == null) {
            // UserPasswordNoMatchException
            return new ResponseEntity<>(new ApiResponse(false, "Your password doesnt match! Please try again."),
                    HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(dto, HttpStatus.OK);
        }
    }

    @PatchMapping("/edit-profile")
    public ResponseEntity<?> editUser(@RequestBody EditProfileDTO updateProfile) {
        if (!userRepository.findById(updateProfile.getId()).get().getEmail().toLowerCase()
                .equals(updateProfile.getEmail().toLowerCase())) {
            // UserEmailNotValidException
            return new ResponseEntity<>(new ApiResponse(false, "Your email is incorrect! Please try again."),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ApiResponse(userService.updateProfile(updateProfile),
                "You successfully updated your profile."), HttpStatus.OK);
    }

    @PatchMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody PasswordChangeDTO passwordChange) throws SQLException {
        if (!userRepository.findById(passwordChange.getUserId()).get().getEmail().toLowerCase()
                .equals(passwordChange.getEmail().toLowerCase())) {
            // UserEmailNotValidException
            return new ResponseEntity<>(new ApiResponse(false, "Your email is incorrect! Please try again."),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ApiResponse(userService.changePassword(passwordChange),
                "You successfully changed you password. Log in again to continue."), HttpStatus.OK);
    }
}
