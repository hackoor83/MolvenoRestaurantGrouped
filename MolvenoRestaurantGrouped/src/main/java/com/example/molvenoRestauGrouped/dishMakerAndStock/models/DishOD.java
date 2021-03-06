package com.example.molvenoRestauGrouped.dishMakerAndStock.models;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
public class DishOD {

    @Id
    @GeneratedValue
    private Long id;
    private String dishName;
    private Double cost, price;

    @OneToMany(mappedBy = "dishOD")
    List<IngredientItem> ingredientItemList;

//    public void setId(Long id) {
//        this.id = id;
//    }

    public List<IngredientItem> getIngredientItemList() {
        return ingredientItemList;
    }

    public void setIngredientItemList(List<IngredientItem> ingredientItemList) {
        this.ingredientItemList = ingredientItemList;
    }

    //    @OneToMany(mappedBy = "dishOD")
//    private Set<IngredientAmount> ingredientAmounts;



//    public Set<IngredientAmount> getIngredientAmounts() {
//        return ingredientAmounts;
//    }
//
//
//    public void setIngredientAmounts(Set<IngredientAmount> ingredientAmounts) {
//        this.ingredientAmounts = ingredientAmounts;
//    }

    //    public void setId(Long id) {
//        this.id = id;
//    }

//
//    public Set<StockItem> getIngredients() {
//        return ingredients;
//    }
//
//    public void setIngredients(Set<StockItem> ingredients) {
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
