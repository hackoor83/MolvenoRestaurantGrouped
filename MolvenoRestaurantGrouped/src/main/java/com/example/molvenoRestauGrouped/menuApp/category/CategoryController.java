package com.example.molvenoRestauGrouped.menuApp.category;
import com.example.molvenoRestauGrouped.menuApp.dish.Dish;
import com.example.molvenoRestauGrouped.menuApp.dish.DishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private DishRepository dishRepository;

    @GetMapping
    @ResponseBody
    public List<Category> getCategories() {
         return categoryService.getAllCategories();
    }

    @GetMapping("/dishes")
    @ResponseBody
    public List<Dish> getAllDishes() {
        return dishRepository.findAll();
    }

    @GetMapping("/{id}")
    public Category getOneCategory(@PathVariable Long id) {

        return categoryService.getCategory(id);
    }

    @PostMapping
    public void addCategory(@RequestBody Category category){
        categoryService.addCategory(category);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
    }

    @PutMapping("/{id}")
    public void updateCategory(@PathVariable Long id, @RequestBody Category category) {
        categoryService.updateCategory(category, id);
    }

}
