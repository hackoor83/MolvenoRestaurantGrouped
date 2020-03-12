package com.example.molvenoRestauGrouped.stockApp.Model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/items")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    // creating a mapping for all items from a database
    @GetMapping
//    @ResponseBody
    public List<Item> getAllItem() {
        return itemRepository.findAll();
    }

    //creating a post: (creating new) mapping to the database

    @PostMapping
    public void postItem(@RequestBody Item item) {
        itemRepository.save(item);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        itemRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public void updateItem(@RequestBody Item item,@PathVariable Long id) {
        itemRepository.save(item);
    }


}
