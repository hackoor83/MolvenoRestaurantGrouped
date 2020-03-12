package com.example.molvenoRestauGrouped.reservationApp;

import org.springframework.data.jpa.repository.JpaRepository;

interface ResevationRepositery extends JpaRepository<Resevation, Long> {
}
