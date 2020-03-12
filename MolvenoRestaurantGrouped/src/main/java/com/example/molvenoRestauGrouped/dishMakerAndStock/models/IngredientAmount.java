package com.example.molvenoRestauGrouped.dishMakerAndStock.models;

import javax.persistence.*;

@Entity
public class IngredientAmount {

    @EmbeddedId
    IngredientAmountKey id;

    @ManyToOne
    @MapsId("stockItem_id")
    @JoinColumn(name = "stockItem_id")
    StockItem stockItem;

    @ManyToOne
    @MapsId("dish_Id")
    @JoinColumn(name = "dish_Id")
    Dish dish;

    Double amount;
    String unit;

    public IngredientAmountKey getId() {
        return id;
    }

    public void setId(IngredientAmountKey id) {
        this.id = id;
    }

    public StockItem getStockItem() {
        return stockItem;
    }

    public void setStockItem(StockItem stockItem) {
        this.stockItem = stockItem;
    }

    public Dish getDish() {
        return dish;
    }

    public void setDish(Dish dish) {
        this.dish = dish;
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
