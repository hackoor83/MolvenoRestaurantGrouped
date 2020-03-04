package com.example.molvenoRestauGrouped.dishMakerAndStock.controllers;

import com.example.molvenoRestauGrouped.dishMakerAndStock.models.Ingredient;
import com.example.molvenoRestauGrouped.dishMakerAndStock.repositories.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ingredientsDb")
public class IngredientsController {

    @Autowired
    IngredientRepository ingredientRepository;

    @GetMapping
    public List<Ingredient> getIngredients(){
        return ingredientRepository.findAll();
    }

    @PostMapping
    public void addIngredient(@RequestBody Ingredient ingredient){
        ingredientRepository.save(ingredient);
    }

    @DeleteMapping("/{id}")
    public void deleteIngredient(@PathVariable Long id){
        ingredientRepository.deleteById(id);
    }

}
