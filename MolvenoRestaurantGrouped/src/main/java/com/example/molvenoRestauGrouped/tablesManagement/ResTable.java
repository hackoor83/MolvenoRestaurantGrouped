package com.example.molvenoRestauGrouped.tablesManagement;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Entity
public class ResTable {
    @Id
    @GeneratedValue
   private Long id;
   private String shape;
   private int numOfSeats;
   private Boolean availability;
    private String tableNum;


    public ResTable(Long id, String shape, int numOfSeats, Boolean availability, String tableNum) {
        this.id = id;
        this.shape = shape;
        this.numOfSeats = numOfSeats;
        this.availability = availability;
        this.tableNum = tableNum;
    }

    public Boolean getAvailability() {
        return availability;
    }

    public void setAvailability(Boolean availability) {
        this.availability = availability;
    }

    public String getTableNum() {
        return tableNum;
    }

    public void setTableNum(String tableNum) {
        this.tableNum = tableNum;
    }




    public ResTable() {
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
