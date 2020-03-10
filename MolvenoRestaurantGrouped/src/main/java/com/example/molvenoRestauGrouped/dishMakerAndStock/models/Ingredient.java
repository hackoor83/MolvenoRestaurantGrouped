package com.example.molvenoRestauGrouped.dishMakerAndStock.models;

import javax.persistence.*;

@Entity
public class Ingredient {
    @Id
    @GeneratedValue
    private Long id;
    private String name, unit;
    private Double amount;
    private Double cost;

    @ManyToOne
    @JoinColumn(name="dishOfTheDay_id")
    private DishOfTheDay dishOfTheDay;

    public DishOfTheDay getDishOfTheDay() {
        return dishOfTheDay;
    }

    public void setDishOfTheDay(DishOfTheDay dishOfTheDay) {
        this.dishOfTheDay = dishOfTheDay;
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

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }
}
