package com.example.molvenoRestauGrouped.reservationApp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/resevation")


public class Restcontroller {
    @Autowired
    private  ResevationRepositery resevationRepositery;
    @GetMapping
    @ResponseBody
    public List<Resevation> getAllesevation() {
        return resevationRepositery.findAll();
    }
    @PostMapping("/addresvation")
    public  void postResevation (@RequestBody Resevation restResevation) {
        resevationRepositery.save(restResevation);

    }

    @DeleteMapping("/{id}")
    public  void deleteResevation(@PathVariable Long id) {
        resevationRepositery.deleteById(id);


    }}
