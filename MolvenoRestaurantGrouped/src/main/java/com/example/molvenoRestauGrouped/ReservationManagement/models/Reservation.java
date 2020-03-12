package com.example.molvenoRestauGrouped.ReservationManagement.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Time;
import java.util.Date;
import java.util.List;

@Entity
public class Reservation {
    @Id
    @GeneratedValue
    private Long id;
    private String guestFirstName;
    private String guestLastName;
    private int telephone;
    private Date date;

    @ManyToOne
    private ResTable resTable;

//    @OneToMany(mappedBy = "reservation")
//    @JsonIgnore
//    private List<ResTable> resTableList;


    public Reservation(Long id, String guestFirstName, String guestLastName, int telephone, Date date, ResTable resTable) {
        this.id = id;
        this.guestFirstName = guestFirstName;
        this.guestLastName = guestLastName;
        this.telephone = telephone;
        this.date = date;
        this.resTable = resTable;
    }

    public Reservation() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public int getTelephone() {
        return telephone;
    }

    public void setTelephone(int telephone) {
        this.telephone = telephone;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

//    public Time getTime() {
//        return time;
//    }
//
//    public void setTime(Time time) {
//        this.time = time;
//    }

    public ResTable getResTable() {
        return resTable;
    }

    public void setResTable(ResTable resTable) {
        this.resTable = resTable;
    }
}
