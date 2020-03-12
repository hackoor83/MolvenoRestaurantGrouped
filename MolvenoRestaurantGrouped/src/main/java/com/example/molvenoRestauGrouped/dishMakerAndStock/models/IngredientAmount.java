//package com.example.molvenoRestauGrouped.dishMakerAndStock.models;
//
//import javax.persistence.*;
//
//@Entity
//public class IngredientAmount {
//
//    @EmbeddedId
//    IngredientAmountKey id;
//
//    @ManyToOne
//    @MapsId("stockItem_id")
//    @JoinColumn(name = "stockItem_id")
//    StockItem stockItem;
//
//    @ManyToOne
//    @MapsId("dishod_Id")
//    @JoinColumn(name = "dishod_Id")
//    DishOD dishOD;
//
//    Double amount;
//    String unit;
//
//    public IngredientAmountKey getId() {
//        return id;
//    }
//
//    public void setId(IngredientAmountKey id) {
//        this.id = id;
//    }
//
//    public StockItem getStockItem() {
//        return stockItem;
//    }
//
//    public void setStockItem(StockItem stockItem) {
//        this.stockItem = stockItem;
//    }
//
//    public DishOD getDishOD() {
//        return dishOD;
//    }
//
//    public void setDishOD(DishOD dishOD) {
//        this.dishOD = dishOD;
//    }
//
//    public Double getAmount() {
//        return amount;
//    }
//
//    public void setAmount(Double amount) {
//        this.amount = amount;
//    }
//
//    public String getUnit() {
//        return unit;
//    }
//
//    public void setUnit(String unit) {
//        this.unit = unit;
//    }
//}
