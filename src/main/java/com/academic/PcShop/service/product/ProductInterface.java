package com.academic.PcShop.service.product;

import com.academic.PcShop.models.ENUM.Category;
import com.academic.PcShop.models.Product;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.UUID;

public interface ProductInterface {


    void updateProduct(Product product);

    Product getProductByProductName(String name);

    Product getProductByProductNumber(UUID uuid);

    List<Product> getProductsByCategory(Category category);

    void deleteProductByProductNumber(UUID uuid);

    @Transactional
    Product createProduct(Product product);
}
