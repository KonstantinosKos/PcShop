package com.academic.PcShop.service.weborder;

import com.academic.PcShop.models.Product;
import com.academic.PcShop.models.WebOrders;

import java.util.List;
import java.util.UUID;

public interface WebOrdersInterface {

    WebOrders createWebOrder (WebOrders webOrders );

    void updateWebOrder(WebOrders webOrders);

    WebOrders getWebOrder (UUID uuid);

    List<Product> getProductsByWebOrderUuid(UUID uuid);

    void deleteWebOrderByUuid(UUID uuid);

}