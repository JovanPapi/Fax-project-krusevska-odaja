package com.krusevskaodaja.service;

import com.krusevskaodaja.model.UtilDTO.EditProfileDTO;
import com.krusevskaodaja.model.UtilDTO.LogInDTO;
import com.krusevskaodaja.model.UtilDTO.PasswordChangeDTO;
import com.krusevskaodaja.model.UtilDTO.SignUpDTO;
import com.krusevskaodaja.model.UserProfile;

import java.sql.SQLException;

public interface UserService {
    int createProfile(SignUpDTO newProfile);

    boolean updateProfile(EditProfileDTO updateProfile);

    boolean changePassword(PasswordChangeDTO newPassword) throws SQLException;

    UserProfile logInUser(LogInDTO userData);

    UserProfile findByEmail(String email);
}
