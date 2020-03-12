package com.example.molvenoRestauGrouped.ReservationManagement.controllers;

import com.example.molvenoRestauGrouped.ReservationManagement.models.ResTable;
import com.example.molvenoRestauGrouped.ReservationManagement.models.Reservation;
import com.example.molvenoRestauGrouped.ReservationManagement.repositories.ResTableRepository;
import com.example.molvenoRestauGrouped.ReservationManagement.repositories.ReservRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/reservation")
public class ReservController {
   @Autowired
   private ReservRepository reservRepository;
   @Autowired
   private ResTableRepository tableRepository;
    @GetMapping
    @ResponseBody
    public List<Reservation> getReservation(){
        return reservRepository.findAll();
    }

    @PostMapping
    public void addReservation(@RequestBody Reservation reservation){
        reservRepository.save(reservation);
    }

    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable Long id){
        reservRepository.deleteById(id);
    }


    @PutMapping("/{id}")
    public Reservation updateReservation(@RequestBody Reservation reservation){
        reservRepository.save(reservation);
        return reservation;
    }
//@PostMapping("/{reservationId}/resTable")
//    public List<ResTable> getTablesByReservationId(@PathVariable Long resTableId){


//    }



}
