package com.example.molvenoRestauGrouped.dishMakerAndStock.repositories;

import com.example.molvenoRestauGrouped.dishMakerAndStock.models.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
}
