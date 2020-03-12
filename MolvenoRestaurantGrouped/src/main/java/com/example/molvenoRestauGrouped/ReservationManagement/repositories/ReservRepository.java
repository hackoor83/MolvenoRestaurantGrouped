package com.example.molvenoRestauGrouped.ReservationManagement.repositories;

import com.example.molvenoRestauGrouped.ReservationManagement.models.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservRepository extends JpaRepository<Reservation,Long> {
}
