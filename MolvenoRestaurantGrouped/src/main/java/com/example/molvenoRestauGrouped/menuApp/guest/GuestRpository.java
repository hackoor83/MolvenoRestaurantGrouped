package com.example.molvenoRestauGrouped.menuApp.guest;


import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestRpository extends JpaRepository<Guest, Long> {

    public Guest findOneById(Long Id);


}
