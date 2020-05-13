import axios from "../custom-build-axios/axios";

export const ReservationService = {
    reserveATable: (userReservationData) => {
        return axios.post("/api/reservations/create-reservation", userReservationData);
    },
    deleteReservation: (reservationId) => {
        return axios.delete(`/api/reservations/delete/${reservationId}`);
    }
};