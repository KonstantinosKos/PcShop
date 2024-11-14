package com.academic.PcShop.repository;

import com.academic.PcShop.models.ENUM.Category;
import com.academic.PcShop.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Product getProductByProductName(String productName);

    Product getProductByProductNumber(UUID uuid);

    List<Product> getProductsByCategory(Category category);
}
