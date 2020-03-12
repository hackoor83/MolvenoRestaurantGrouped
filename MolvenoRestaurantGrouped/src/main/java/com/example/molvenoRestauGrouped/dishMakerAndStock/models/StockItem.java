package com.example.molvenoRestauGrouped.dishMakerAndStock.models;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
public class StockItem {
    @Id
    @GeneratedValue
    private Long id;
    private String name, unit;
    private Double amount;
    private Double cost;
//
//    @ManyToMany(mappedBy = "ingredients")
//    Set<Dish> dishList;

    @OneToMany(mappedBy = "stockItem")
    private Set<IngredientAmount> ingredientAmounts;

    public Set<IngredientAmount> getIngredientAmounts() {
        return ingredientAmounts;
    }

    public void setIngredientAmounts(Set<IngredientAmount> ingredientAmounts) {
        this.ingredientAmounts = ingredientAmounts;
    }


    //    @JoinColumn(name="dish_id")
//    private Dish dish;

//    public DishOfTheDay getDishOfTheDay() {
//        return dishOfTheDay;
//    }
//
//    public void setDishOfTheDay(DishOfTheDay dishOfTheDay) {
//        this.dishOfTheDay = dishOfTheDay;
//    }


//    public Set<Dish> getDishList() {
//        return dishList;
//    }
//
//    public void setDishList(Set<Dish> dishList) {
//        this.dishList = dishList;
//    }

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
