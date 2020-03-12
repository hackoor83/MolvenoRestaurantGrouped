package com.example.molvenoRestauGrouped.dishMakerAndStock.repositories;

import com.example.molvenoRestauGrouped.dishMakerAndStock.models.DishOfTheDay;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DishOfTheDayRepository extends JpaRepository<DishOfTheDay, Long> {
}
