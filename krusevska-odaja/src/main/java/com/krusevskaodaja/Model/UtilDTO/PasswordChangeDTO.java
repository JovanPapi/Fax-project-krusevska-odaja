package com.krusevskaodaja.Model.UtilDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PasswordChangeDTO {

    private String userId;
    private String email;
    private String oldPassword;
    private String newPassword;

}
