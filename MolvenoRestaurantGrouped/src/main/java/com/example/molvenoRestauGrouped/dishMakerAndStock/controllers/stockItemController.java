package com.example.molvenoRestauGrouped.dishMakerAndStock.controllers;

import com.example.molvenoRestauGrouped.dishMakerAndStock.models.StockItem;
import com.example.molvenoRestauGrouped.dishMakerAndStock.repositories.stockItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ingredientsDb")
public class stockItemController {

    @Autowired
    stockItemRepository stockItemRepository;

    @GetMapping
    public List<StockItem> getIngredients(){
        return stockItemRepository.findAll();
    }

    @PostMapping
    public void addIngredient(@RequestBody StockItem stockItem){
        stockItemRepository.save(stockItem);
    }

    @DeleteMapping("/{id}")
    public void deleteIngredient(@PathVariable Long id){
        stockItemRepository.deleteById(id);
    }

    @PutMapping("/update/{id}")
    public void editStockItem(@RequestBody StockItem stockItem, @PathVariable Long id){
        stockItem.setId(id);
        stockItemRepository.save(stockItem);

    }

}
