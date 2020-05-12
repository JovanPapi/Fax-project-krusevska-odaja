package com.krusevskaodaja.Service.InterfaceImpl;

import com.krusevskaodaja.Model.TableReservation;
import com.krusevskaodaja.Model.UserProfile;
import com.krusevskaodaja.Model.UtilDTO.ReservationDTO;
import com.krusevskaodaja.Repository.JpaReservationRepository;
import com.krusevskaodaja.Repository.JpaUserRepository;
import com.krusevskaodaja.Service.ReservationService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
public class ReservationServiceImpl implements ReservationService {

    private final JpaReservationRepository reservationRepository;
    private final JpaUserRepository userRepository;

    public ReservationServiceImpl(JpaReservationRepository reservationRepository, JpaUserRepository userRepository) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
    }

    /**
     * Returns all reservations that are created by the users which have account
     * on the web application. This feature is only available for the Admins
     * of the web application. This method is not yet used in the application.
     */
    @Override
    public List<TableReservation> fetchAllReservations() {
        return reservationRepository.findAll();
    }

    /**
     * Function that creates a new reservation made by user. It takes
     * ReservationDTO object which is processed into Reservation object
     * and saved in the database.
     * If the user already have an reservation, it returns the user immediately.
     * If the user dont have reservation, it adds and save the user in the database
     * and is returned back.
     */
    @Override
    public UserProfile createReservation(ReservationDTO newReservation) {
        UserProfile user = userRepository.findById(newReservation.getUserId()).get();
        if (user.getReservation() != null) {
            return user;
        }
        TableReservation reservation = new TableReservation();

        LocalTime time = LocalTime.parse(newReservation.getTime());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate date = LocalDate.parse(newReservation.getDate(), formatter);

        reservation.setDate(date);
        reservation.setTime(time);
        reservation.setId(UUID.randomUUID().toString());
        reservation.setUserNumber(newReservation.getUserNumber());
        reservation.setTableNumber(newReservation.getTableNumber());

        reservation.setRestrictionTime(time.plusMinutes(45));

        user.setReservation(reservation);
        reservation.setUser(user);

        userRepository.save(user);

        return user;
    }


    /**
     * Takes id param of the reservation and deletes the reservation from the database.
     * Returns only false if the reservation is not found in the database.
     * Returns true the reservation was deleted successfully.
     */
    @Override
    public boolean deleteReservation(String id) {
        if (reservationRepository.findById(id).isEmpty()) {
            return false;
        }
        reservationRepository.findById(id).get().getUser().setReservation(null);
        reservationRepository.deleteById(id);

        return true;
    }
}
