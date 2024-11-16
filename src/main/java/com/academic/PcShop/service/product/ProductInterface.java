package com.academic.PcShop.service.product;

import com.academic.PcShop.models.ENUM.Category;
import com.academic.PcShop.models.Product;

import java.util.List;
import java.util.UUID;

public interface ProductInterface {

    Product createProduct (Product product);

    void updateProduct(Product product);

    Product getProductByProductName(String name);

    Product getProductByProductNumber(UUID uuid);

    List<Product> getProductsByCategory(Category category);

    void deleteProductByProductNumber(UUID uuid);
}
