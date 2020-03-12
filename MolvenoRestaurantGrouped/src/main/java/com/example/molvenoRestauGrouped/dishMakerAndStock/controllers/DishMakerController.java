package com.example.molvenoRestauGrouped.dishMakerAndStock.controllers;

import com.example.molvenoRestauGrouped.dishMakerAndStock.models.DishOD;
import com.example.molvenoRestauGrouped.dishMakerAndStock.models.IngredientAmount;
import com.example.molvenoRestauGrouped.dishMakerAndStock.repositories.DishODRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/dishMaker")
public class DishMakerController {

    @Autowired
    private DishODRepository dishODRepository;

    @GetMapping
    public List<DishOD> listDishOfTheDay(){
        return dishODRepository.findAll();
    }

    @GetMapping("/{id}/ingredients")
    public Set<IngredientAmount> getIngredientsForDish(@PathVariable Long id) {
        return dishODRepository.findById(id).get().getIngredientAmounts();
    }

    @PostMapping
    public void addDishOfTheDay(@RequestBody DishOD dishOD){
        dishODRepository.save(dishOD);
    }

    @DeleteMapping("{id}")
    public void deleteDishOfTheDay(@PathVariable Long id){
        dishODRepository.deleteById(id);
    }


}
