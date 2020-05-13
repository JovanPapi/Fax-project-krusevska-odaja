package com.krusevskaodaja.Service.InterfaceImpl;

import com.krusevskaodaja.Model.UtilDTO.EditProfileDTO;
import com.krusevskaodaja.Model.UtilDTO.LogInDTO;
import com.krusevskaodaja.Model.UtilDTO.PasswordChangeDTO;
import com.krusevskaodaja.Model.UtilDTO.SignUpDTO;
import com.krusevskaodaja.Model.UserPhoneNumber;
import com.krusevskaodaja.Model.UserProfile;
import com.krusevskaodaja.Repository.JpaUserRepository;
import com.krusevskaodaja.Service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final JpaUserRepository userRepository;

    public UserServiceImpl(JpaUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Returns all user accounts that are created by the clients.
     * This function is not yet used in the application, and only
     * Admins of the application can access this function.
     */
    public List<UserProfile> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Function that creates new user profile. It takes SignUpDTO object and
     * transforms it into UserProfile which is saved in the database.
     * Returns "number" if the new profile has same phone number
     * with another user from the database.
     * Returns 1 if the new profile is successfully created.
     * The other validation is executed in the controller.
     */
    @Override
    public int createProfile(SignUpDTO newProfile) {

        List<UserPhoneNumber> userPhoneNumbers = new ArrayList<>(newProfile.getPhoneNumber().size());
        newProfile.getPhoneNumber().forEach(s -> userPhoneNumbers.add(new UserPhoneNumber(UUID.randomUUID().toString(), s, null)));

        List<UserProfile> allUsers = userRepository.findAll();
        for (UserProfile up : allUsers) {
            int number = up.checkPhoneNumbers(userPhoneNumbers);
            if (number != 1) {
                return number;
            }
        }

        UserProfile user = new UserProfile(UUID.randomUUID().toString(), newProfile.getName(), newProfile.getUsername(),
                newProfile.getEmail(), newProfile.getPassword(), userPhoneNumbers, null, "User", false);

        userPhoneNumbers.forEach(userPhoneNumber -> userPhoneNumber.setUser(user));

        userRepository.save(user);
        return 1;
    }

    /**
     * Function that updates an existing user profile. It takes EditProfileDTO object
     * and by its ID, its found the real user profile from the database
     * which is modified and saved again.
     * The validation for user security is executed in the controller.
     * Returns true if the existing user profile is successfully modified.
     */
    @Override
    public boolean updateProfile(EditProfileDTO updateProfile) {
        Optional<UserProfile> userDb = userRepository.findById(updateProfile.getId());

        UserProfile editUser = userDb.get();

        editUser.setName(updateProfile.getName());
        editUser.setUsername(updateProfile.getUsername());
        editUser.setEmail(updateProfile.getEmail());

        List<UserPhoneNumber> utilList = editUser.getPhoneNumber();
        utilList.get(0).setPhoneNumber(updateProfile.getPhoneNumber().get(0));
        utilList.get(1).setPhoneNumber(updateProfile.getPhoneNumber().get(1));

        editUser.setPhoneNumber(utilList);
        editUser.setTermsChecked(updateProfile.isTermsChecked());

        userRepository.save(editUser);

        return true;
    }

    /**
     * Function that change the old password of a user profile.
     * It takes PasswordChangeDTO object and by its ID the user
     * from the database is found his password is modified to the new one.
     * The validation is executed in the controller.
     * Returns true if the user is successfully modified.
     */
    @Override
    public boolean changePassword(PasswordChangeDTO newPassword) {
        Optional<UserProfile> userDb = userRepository.findById(newPassword.getUserId());
        UserProfile userProfile = userDb.get();

        userProfile.setPassword(newPassword.getNewPassword());

        userRepository.save(userProfile);

        return true;

    }

    /**
     * Function that takes LogInDTO object and with it,
     * it logs in the current user.
     * The validation is executed in the controller.
     * Returns null if the input password does not match the user email password.
     * Returns the user from the database if the user log in was successfully.
     */
    @Override
    public UserProfile logInUser(LogInDTO userData) {
        Optional<UserProfile> checkIn = userRepository.findAll()
                .stream()
                .filter(profile -> profile.getEmail().toLowerCase().equals(userData.getUsernameOrEmail().toLowerCase()) ||
                        profile.getUsername().equals(userData.getUsernameOrEmail()))
                .findFirst();
        if (!checkIn.get().getPassword().equals(userData.getPassword())) {
            return null;
        }
        return checkIn.get();
    }
}
