package com.example.molvenoRestauGrouped.ReservationManagement.models;

import javax.persistence.*;

@Table(uniqueConstraints={@UniqueConstraint(columnNames={"tableNum"})})
@Entity
public class ResTable {
    @Id
    @GeneratedValue
   private Long id;
   private String shape;
   private int numOfSeats;
   private Boolean available;
    private String tableNum;
//    @ManyToOne
//    private Reservation reservation;


    public ResTable(Long id, String shape, int numOfSeats, Boolean available, String tableNum) {
        this.id = id;
        this.shape = shape;
        this.numOfSeats = numOfSeats;
        this.available = available;
        this.tableNum = tableNum;
    }

    public ResTable() {
    }

//    public Reservation getReservation() {
//        return reservation;
//    }
//
//    public void setReservation(Reservation reservation) {
//        this.reservation = reservation;
//    }


    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = true;

    }

    public String getTableNum() {
        return tableNum;
    }

    public void setTableNum(String tableNum) {
        this.tableNum = tableNum;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getShape() {
        return shape;
    }

    public void setShape(String shape) {
        this.shape = shape;
    }

    public int getNumOfSeats() {
        return numOfSeats;
    }

    public void setNumOfSeats(int numOfSeats) {
        this.numOfSeats = numOfSeats;
    }


}
