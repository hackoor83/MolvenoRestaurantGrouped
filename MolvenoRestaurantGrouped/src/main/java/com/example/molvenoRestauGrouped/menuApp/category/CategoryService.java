package com.example.molvenoRestauGrouped.menuApp.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    // add category
    public void addCategory(Category category) {
        categoryRepository.save(category);
    }

    // get all categories
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // get one category by its id
    public Category getCategory(Long id) {
        return categoryRepository.findOneById(id);
    }

   // delete category by id
    public void deleteCategory(Long id){
        categoryRepository.deleteById(id);
    }

    // update category
    public void updateCategory(Category category, Long id) {
        categoryRepository.save(category);
    }

}
