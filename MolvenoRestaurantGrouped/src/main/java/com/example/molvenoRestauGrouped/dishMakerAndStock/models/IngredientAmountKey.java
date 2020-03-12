package com.example.molvenoRestauGrouped.dishMakerAndStock.models;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
public class IngredientAmount implements Serializable {

    @Column(name = "stockItem_id")
    Long stockItemId;

    @Column(name = "dish_Id")
    Long dishId;

//    @OneToMany
//    Dish dish;
//
//    @OneToMany
//    StockItem stockItem;


    public Long getStockItemId() {
        return stockItemId;
    }

    public void setStockItemId(Long stockItemId) {
        this.stockItemId = stockItemId;
    }

    public Long getDishId() {
        return dishId;
    }

    public void setDishId(Long dishId) {
        this.dishId = dishId;
    }
}
