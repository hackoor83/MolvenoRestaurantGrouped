package com.example.molvenoRestauGrouped.dishMakerAndStock.repositories;

import com.example.molvenoRestauGrouped.dishMakerAndStock.models.StockItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface stockItemRepository extends JpaRepository<StockItem, Long> {
}
