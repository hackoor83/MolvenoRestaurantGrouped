package com.example.molvenoRestauGrouped.ReservationManagement.repositories;

import com.example.molvenoRestauGrouped.ReservationManagement.models.ResTable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResTableRepository extends JpaRepository <ResTable,Long>{
    //name of u class entity and type the type of uw id primarykey


}
