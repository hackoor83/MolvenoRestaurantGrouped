package com.example.molvenoRestauGrouped.dishMakerAndStock.controllers;

import com.example.molvenoRestauGrouped.dishMakerAndStock.models.Dish;
import com.example.molvenoRestauGrouped.dishMakerAndStock.models.IngredientAmount;
import com.example.molvenoRestauGrouped.dishMakerAndStock.models.StockItem;
import com.example.molvenoRestauGrouped.dishMakerAndStock.repositories.DishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/dishMaker")
public class DishMakerController {

    @Autowired
    private DishRepository dishRepository;

    @GetMapping
    public List<Dish> listDishOfTheDay(){
        return dishRepository.findAll();
    }

    @GetMapping("/{id}/ingredients")
    public Set<IngredientAmount> getIngredientsForDish(@PathVariable Long id) {
        return dishRepository.findById(id).get().getIngredientAmounts();
    }

    @PostMapping
    public void addDishOfTheDay(@RequestBody Dish dish){
        dishRepository.save(dish);
    }

    @DeleteMapping("{id}")
    public void deleteDishOfTheDay(@PathVariable Long id){
        dishRepository.deleteById(id);
    }


}
