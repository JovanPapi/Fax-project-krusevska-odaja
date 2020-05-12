package com.krusevskaodaja.Model.ApiResponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ApiResponse {
    private boolean success;
    private String message;
    private Object object;

    public ApiResponse(boolean success, String message, Object object) {
        this.success = success;
        this.message = message;
        this.object = object;
    }

    public ApiResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

}
