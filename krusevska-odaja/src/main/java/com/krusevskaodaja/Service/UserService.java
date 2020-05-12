package com.krusevskaodaja.Service;

import com.krusevskaodaja.Model.UtilDTO.EditProfileDTO;
import com.krusevskaodaja.Model.UtilDTO.LogInDTO;
import com.krusevskaodaja.Model.UtilDTO.PasswordChangeDTO;
import com.krusevskaodaja.Model.UtilDTO.SignUpDTO;
import com.krusevskaodaja.Model.UserProfile;

import java.sql.SQLException;

public interface UserService {
    int createProfile(SignUpDTO newProfile);

    boolean updateProfile(EditProfileDTO updateProfile);

    boolean changePassword(PasswordChangeDTO newPassword) throws SQLException;

    UserProfile logInUser(LogInDTO userData);
}
