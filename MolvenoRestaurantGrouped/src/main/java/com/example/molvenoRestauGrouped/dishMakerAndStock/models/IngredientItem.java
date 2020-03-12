package com.example.molvenoRestauGrouped.dishMakerAndStock.models;

import javax.persistence.*;

@Entity
public class IngredientItem {

    @Id
    @GeneratedValue
    Long id;
    String name;
    Double amount;
    String unit;

    @ManyToOne
    DishOD dishOD;

    public DishOD getDishOD() {
        return dishOD;
    }

    public void setDishOD(DishOD dishOD) {
        this.dishOD = dishOD;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }
}
