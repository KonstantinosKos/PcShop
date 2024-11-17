package com.academic.PcShop.controller;

import com.academic.PcShop.models.Product;
import com.academic.PcShop.models.WebOrders;
import com.academic.PcShop.service.weborder.WebOrdersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/web-order")
public class WebOrderController {

    private WebOrdersService webOrdersService;

    @PostMapping
    public ResponseEntity<WebOrders> createWebOrder(@RequestBody WebOrders webOrders) {
        return new ResponseEntity<>(webOrdersService.createWebOrder(webOrders), HttpStatus.CREATED);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateWebOrder(@RequestBody WebOrders webOrders) {
        webOrdersService.updateWebOrder(webOrders);
    }

    @GetMapping
    public ResponseEntity<WebOrders> getWebOrder(@RequestParam UUID uuid) {
        return new ResponseEntity<>(webOrdersService.getWebOrder(uuid), HttpStatus.OK);
    }

    @GetMapping(path = "/list", params = {"order-number"})
    public ResponseEntity<List<Product>> getProductsByWebOrderUuid(@RequestParam UUID uuid) {
        return new ResponseEntity<>(webOrdersService.getProductsByWebOrderUuid(uuid), HttpStatus.OK);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.OK)
    public void deleteWebOrderByUuid(@RequestParam UUID uuid) {
        webOrdersService.deleteWebOrderByUuid(uuid);
    }
}
