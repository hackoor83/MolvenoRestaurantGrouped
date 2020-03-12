package com.example.molvenoRestauGrouped.reservationApp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Resevation {

    @Id
    @GeneratedValue
    private Long id;
    private String time;
    private String guestFirstName;
    private String guestLastName;
    private String date;
    private int telefoon;
    private int numberOfGuest;
//    private List<Table> tables = new ArrayList<>();

    public Resevation() {
    }

    public Resevation(Long id, String time, String guestFirstName, String guestLastName, String date, int telefoon, int numberOfGuest) {
        this.id = id;
        this.time = time;
        this.guestFirstName = guestFirstName;
        this.guestLastName = guestLastName;
        this.date = date;
        this.telefoon = telefoon;
        this.numberOfGuest = numberOfGuest;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getGuestFirstName() {
        return guestFirstName;
    }

    public void setGuestFirstName(String guestFirstName) {
        this.guestFirstName = guestFirstName;
    }

    public String getGuestLastName() {
        return guestLastName;
    }

    public void setGuestLastName(String guestLastName) {
        this.guestLastName = guestLastName;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getTelefoon() {
        return telefoon;
    }

    public void setTelefoon(int telefoon) {
        this.telefoon = telefoon;
    }

    public int getNumberOfGuest() {
        return numberOfGuest;
    }

    public void setNumberOfGuest(int numberOfGuest) {
        this.numberOfGuest = numberOfGuest;
    }
}