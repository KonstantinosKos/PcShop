package com.academic.PcShop.service.product;

import com.academic.PcShop.models.ENUM.Category;
import com.academic.PcShop.models.Product;
import com.academic.PcShop.models.subModels.Image;
import com.academic.PcShop.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService implements ProductInterface {

    private final Logger logger = LoggerFactory.getLogger(ProductService.class);
    private final ProductRepository productRepository;

    public JpaRepository<Product, Long> getProductRepository() {
        return productRepository;
    }

    @Transactional
    @Override
    public Product createProduct(Product product) {

        ArrayList<Image> images = new ArrayList<>();

        for (Image imageData : product.getImages()) {
            imageData.setProduct(product);
            images.add(imageData);
        }
        product.setImages(images);
        productRepository.save(product);
        return product;
    }

    @Override
    public void updateProduct(Product product) {
        productRepository.save(product);
    }

    @Override
    @Transactional
    public Product getProductByProductName(String name) {
        try {
            return productRepository.getProductByProductName(name);
        } catch (Exception e) {
            logger.debug("There is no product with name: {}", name);
        }
        return null;
    }

    @Override
    @Transactional
    public Product getProductByUuid(UUID uuid) {
        try {
            return productRepository.getProductByUuid(uuid);
        } catch (Exception e) {
            logger.debug("There is no product with number: {}", uuid);
        }
        return null;
    }

    @Override
    @Transactional
    public List<Product> getProductsByCategory(Category category) {
        try {
            return productRepository.getProductsByCategory(category);
        } catch (Exception e) {
            logger.debug("There are no products with category: {}", category);
        }
        return Collections.emptyList();
    }

    @Override
    public void deleteProductByProductNumber(UUID uuid) {
        try {
            Product product = getProductByUuid(uuid);
            productRepository.delete(product);
        } catch (Exception e) {
            logger.debug("There is no product to delete with number: {}", uuid);
        }
    }
}
