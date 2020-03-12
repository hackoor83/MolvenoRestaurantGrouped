package com.example.molvenoRestauGrouped.menuApp.dish;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class DishService {

    @Autowired
    private DishRepository dishRepository;

    public List<Dish> getDishes(Long id) {
        return dishRepository.findByCategoryId(id);
    }

    public Dish getOneDish(Long id) {
        return dishRepository.findOneById(id);
    }

    public void addDish(Dish dish) {
        dishRepository.save(dish);
    }
    public void deleteDish(Long id) {
        dishRepository.deleteById(id);
    }

    public void updateDish(Dish dish) {
        dishRepository.save(dish);
    }
}
