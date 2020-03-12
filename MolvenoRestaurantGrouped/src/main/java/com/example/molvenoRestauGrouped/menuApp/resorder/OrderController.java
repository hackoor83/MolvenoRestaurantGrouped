package com.example.molvenoRestauGrouped.menuApp.resorder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public List<ResOrder> getAllOrders(){
       return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public ResOrder getOneOrder(@PathVariable Long id){
         return orderService.getOneOrder(id);
    }

    @PostMapping
    public void addOrder(@RequestBody ResOrder resOrder) {
        orderService.addOrder(resOrder);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id){
        orderService.deleteOrder(id);
    }

    @PutMapping("/{id}")
    public void updateOrder(@RequestBody ResOrder resOrder) {
        orderService.updateOrder(resOrder);
    }
}
