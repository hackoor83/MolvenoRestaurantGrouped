package com.example.molvenoRestauGrouped.menuApp.dish;


import com.example.molvenoRestauGrouped.menuApp.category.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/categories/{categoryid}/dishes")
public class DishController {

    @Autowired
    private DishService dishService;

    @GetMapping
    @ResponseBody
    public List<Dish> getAllDishes(@PathVariable Long categoryid) {
        return dishService.getDishes(categoryid);
    }

    @GetMapping("/{id}")
    public Dish getDish(@PathVariable Long id) {
        return dishService.getOneDish(id);
    }

    @PostMapping
    public void addDish(@RequestBody Dish dish, @PathVariable Long categoryid) {
        dish.setCategory(new Category(categoryid, "",""));
        dishService.addDish(dish);
    }

    @PutMapping("/{id}")
    public void updateDish(@RequestBody Dish dish, @PathVariable Long id, @PathVariable Long categoryid) {
        dish.setCategory(new Category(categoryid, "",""));
        dishService.updateDish(dish);
    }

    @DeleteMapping("/{id}")
    public void deleteDish(@PathVariable Long id) {
        dishService.deleteDish(id);
    }


}
