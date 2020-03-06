package com.example.molvenoRestauGrouped.tablesManagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tables")
public class RestTableController {
    @Autowired
    ResTableRepository myrepository;

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
    myrepository.save(resTable);
     }
//api/tables/1
    //delete method to delete by its ID
    @DeleteMapping("/{id}")
    public void deleteTable(@PathVariable Long id){
    myrepository.deleteById(id);
    }

    @PutMapping({"/id"})
    public void updateTable (@PathVariable Long id,@RequestBody ResTable resTable){
    resTable.setId(id);
    myrepository.save(resTable);
    }




}
