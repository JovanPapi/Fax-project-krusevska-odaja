import axios from "../custom-build-axios/axios";

export const UserService = {
    logInUser: (signInData) => {
        return axios.post("/api/users/log-in", signInData);
    },
    registerUser: (signUpData) => {
        return axios.post("/api/users/register", signUpData);
    },
    modifyProfile: (profileData) => {
        return axios.patch("/api/users/edit-profile", profileData);
    },
    changePassword: (passwordData) => {
        return axios.patch("/api/users/change-password", passwordData);
    }
};