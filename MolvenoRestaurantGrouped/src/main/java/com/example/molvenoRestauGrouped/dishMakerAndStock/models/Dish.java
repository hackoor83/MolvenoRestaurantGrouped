package com.example.molvenoRestauGrouped.dishMakerAndStock.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
public class DishOfTheDay {

    @Id
    @GeneratedValue
    private Long id;
    private String dishName;
    private Double cost, price;

    @OneToMany(
            mappedBy = "dishOfTheDay",
            cascade = {CascadeType.ALL}
    )
    private List<DishOfDayIngredient> dishOfDayIngredientList;
//    private List<Ingredient> ingredients;

//    public void setId(Long id) {
//        this.id = id;
//    }

    public List<DishOfDayIngredient> getDishOfDayIngredientList() {
        return dishOfDayIngredientList;
    }

    public void setDishOfDayIngredientList(List<DishOfDayIngredient> dishOfDayIngredientList) {
        this.dishOfDayIngredientList = dishOfDayIngredientList;
    }

    //    public List<Ingredient> getIngredients() {
//        return ingredients;
//    }

//    public void setIngredients(List<Ingredient> ingredients) {
//        this.ingredients = ingredients;
//    }

    public Long getId() {
        return id;
    }

    public String getDishName() {
        return dishName;
    }

    public void setDishName(String dishName) {
        this.dishName = dishName;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
