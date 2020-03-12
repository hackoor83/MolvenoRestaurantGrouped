package com.example.molvenoRestauGrouped.menuApp.resorder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class OrderService {

    // fields

    @Autowired
    private OrderRepository orderRepository;

    public List<ResOrder> getAllOrders() {
       return orderRepository.findAll();
    }

    public ResOrder getOneOrder(Long id){
        return orderRepository.findOneById(id);
    }

    public void addOrder(ResOrder resOrder) {
        orderRepository.save(resOrder);
    }


    public void updateOrder(ResOrder resOrder) {
      orderRepository.save(resOrder);
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
