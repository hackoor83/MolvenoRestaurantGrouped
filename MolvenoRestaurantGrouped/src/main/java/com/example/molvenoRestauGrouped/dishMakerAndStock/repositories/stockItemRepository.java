package com.example.molvenoRestauGrouped.dishMakerAndStock.repositories;

import com.example.molvenoRestauGrouped.dishMakerAndStock.models.stockItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<stockItem, Long> {
}
