package com.example.molvenoRestauGrouped.ReservationManagement.controllers;

import com.example.molvenoRestauGrouped.ReservationManagement.models.ResTable;
import com.example.molvenoRestauGrouped.ReservationManagement.repositories.ResTableRepository;
import com.example.molvenoRestauGrouped.ReservationManagement.repositories.ReservRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tables")
public class RestTableController {
    @Autowired
    ResTableRepository myrepository;
@Autowired
    ReservRepository reservRepository;
    //creating a get mapping for all tables from a database
@GetMapping
@ResponseBody
public List<ResTable> getAllTable  (){
    return myrepository.findAll();

}

//creating post(add)
    @PostMapping
    public void postTable(@RequestBody ResTable resTable){
    //Car my car
//    resTable.setAvailable(true);
    myrepository.save(resTable);
     }
//api/tables/1
    //delete method to delete by its ID
    @DeleteMapping("/{id}")
    public void deleteTable(@PathVariable Long id){
    myrepository.deleteById(id);
    }

    @PutMapping("update/{id}")
    public void updateTable (@PathVariable Long id,@RequestBody ResTable resTable){
   // resTable.setId(id);
    myrepository.save(resTable);
    }

//    @PostMapping("/api/tables/available")
//    public void available(@RequestBody ResTable resTable){
//    ResTable[] restaurantTables ={};
//    for( ResTable resTable1: restaurantTables){
//        if(resTable.getAvailability()==true){
//            myrepository.findById(resTable.getId());
//        }
//        else{
//
//        }
//
//    }
//
//    }




}
