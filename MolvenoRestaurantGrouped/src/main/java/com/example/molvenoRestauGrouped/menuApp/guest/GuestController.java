package com.example.molvenoRestauGrouped.menuApp.guest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/guests")
public class GuestController {

    @Autowired
    private GuestService guestService;

    @GetMapping
    @ResponseBody
    public List<Guest> getAllGuests(){
       return guestService.getAllGuests();
    }

    @GetMapping("/{id}")
    public Guest getOneGuest(@PathVariable Long id){
        return guestService.getOneGuest(id);
    }

    @PostMapping
    public void addGuest(@RequestBody Guest guest){
        guestService.addGuest(guest);
    }

    @PutMapping("/{id}")
    public void updateGuest(@PathVariable Long id, @RequestBody Guest guest) {
        guestService.updateGuest(guest, id);
    }

    @DeleteMapping("/{id}")
    public void deleteGuest(@PathVariable Long id){
        guestService.deleteGuest(id);
    }

}
