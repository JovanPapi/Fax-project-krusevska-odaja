package com.krusevskaodaja.Web;

import com.krusevskaodaja.Model.ApiResponse.ApiResponse;
import com.krusevskaodaja.Model.UtilDTO.ReservationDTO;
import com.krusevskaodaja.Service.InterfaceImpl.ReservationServiceImpl;
import com.krusevskaodaja.Service.ReservationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping(value = "/api/reservations", produces = "application/json")
public class ReservationApiController {

    private final ReservationService reservationService;

    public ReservationApiController(ReservationServiceImpl reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping("/all-reservations")
    public ResponseEntity<?> fetchAllReservations() {
        return new ResponseEntity<>(reservationService.fetchAllReservations(), HttpStatus.OK);
    }

    @PostMapping("/create-reservation")
    public ResponseEntity<?> createReservation(@RequestBody ReservationDTO newReservation) {
        return new ResponseEntity<>(reservationService.createReservation(newReservation), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{reservationId}")
    public ResponseEntity<?> deleteReservation(@PathVariable String reservationId) {
        if (!reservationService.deleteReservation(reservationId)) {
            return new ResponseEntity<>(new ApiResponse(false, "There was something wrong when trying" +
                    "to delete the reservation! Please try again."), HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(new ApiResponse(true, "Your reservation is deleted successfully."),
                    HttpStatus.OK);
        }
    }
}
