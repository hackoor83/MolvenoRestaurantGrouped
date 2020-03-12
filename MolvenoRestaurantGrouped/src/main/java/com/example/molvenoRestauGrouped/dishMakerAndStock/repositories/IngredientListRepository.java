package com.example.molvenoRestauGrouped.dishMakerAndStock.repositories;

import com.example.molvenoRestauGrouped.dishMakerAndStock.models.IngredientItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientListRepository extends JpaRepository<IngredientItem, Long> {
}
