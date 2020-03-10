package com.example.molvenoRestauGrouped.dishMakerAndStock.controllers;

import com.example.molvenoRestauGrouped.dishMakerAndStock.models.DishOfTheDay;
import com.example.molvenoRestauGrouped.dishMakerAndStock.repositories.DishOfTheDayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dishMaker")
public class DishMakerController {

    @Autowired
    private DishOfTheDayRepository dishOfTheDayRepository;

    @GetMapping
    public List<DishOfTheDay> listDishOfTheDay(){
        return dishOfTheDayRepository.findAll();
    }

    @PostMapping
    public void addDishOfTheDay(@RequestBody DishOfTheDay dishOfTheDay){
        dishOfTheDayRepository.save(dishOfTheDay);
    }

    @DeleteMapping("{id}")
    public void deleteDishOfTheDay(@PathVariable Long id){
        dishOfTheDayRepository.deleteById(id);
    }
}
