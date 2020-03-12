package com.example.molvenoRestauGrouped.menuApp.guest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class GuestService {

    @Autowired
    private GuestRpository guestRpository;

    public List<Guest> getAllGuests() {
       return guestRpository.findAll();
    }

    public Guest getOneGuest(Long id) {
        return guestRpository.findOneById(id);
    }

    public void addGuest(Guest guest) {
        guestRpository.save(guest);
    }

    public void updateGuest(Guest guest,  Long id){

        guestRpository.save(guest);
    }

    public void deleteGuest(Long id){
        guestRpository.deleteById(id);
    }

}
