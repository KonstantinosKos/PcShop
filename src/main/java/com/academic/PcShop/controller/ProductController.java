package com.academic.PcShop.controller;

import com.academic.PcShop.models.ENUM.Category;
import com.academic.PcShop.models.Product;
import com.academic.PcShop.service.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/product")
public class ProductController {

    private final ProductService productService;


    @PostMapping
    public ResponseEntity<Product> createProduct (@RequestBody Product product) {
        return new ResponseEntity<>(productService.createProduct(product), HttpStatus.CREATED);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public  void updateProduct (@RequestBody Product product) {
        productService.updateProduct(product);
    }

    @GetMapping(params = {"name"})
    public ResponseEntity<Product> getProductByProductName(@RequestParam String name){
        return new ResponseEntity<>(productService.getProductByProductName(name), HttpStatus.OK);
    }

    @GetMapping(params = {"product-number"})
    public ResponseEntity<Product> getProductByProductNumber(@RequestParam UUID uuid) {
        return new ResponseEntity<>(productService.getProductByProductNumber(uuid), HttpStatus.OK);
    }

    @GetMapping(params = {"category"}, path = "/?category")
    public ResponseEntity<List<Product>> getProductsByCategory(@RequestParam Category category) {
       return new ResponseEntity<>(productService.getProductsByCategory(category), HttpStatus.OK);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.OK)
    public void deleteProductByProductNumber(@RequestParam UUID uuid) {
        productService.deleteProductByProductNumber(uuid);
    }
}
