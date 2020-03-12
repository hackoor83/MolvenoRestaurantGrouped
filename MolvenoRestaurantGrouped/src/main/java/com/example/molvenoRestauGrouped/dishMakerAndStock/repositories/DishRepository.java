package com.example.molvenoRestauGrouped.dishMakerAndStock.repositories;

import com.example.molvenoRestauGrouped.dishMakerAndStock.models.Dish;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DishRepository extends JpaRepository<Dish, Long> {
}
