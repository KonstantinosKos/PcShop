package com.academic.PcShop.service.weborder;

import com.academic.PcShop.models.Product;
import com.academic.PcShop.models.WebOrders;
import com.academic.PcShop.repository.WebOrdersRepository;
import java.util.Collections;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WebOrdersService implements WebOrdersInterface {

    private static final Logger logger = LoggerFactory.getLogger(WebOrdersService.class);
    private final WebOrdersRepository webOrdersRepository;

    public JpaRepository<WebOrders, Long> getWebOrdersRepository() {
        return webOrdersRepository;
    }

    @Override
    public WebOrders createWebOrder(WebOrders webOrders) {
        return webOrdersRepository.save(webOrders);
    }

    @Override
    public void updateWebOrder(WebOrders webOrders){
        webOrdersRepository.save(webOrders);
    }

    @Override
    public WebOrders getWebOrder(UUID uuid) {
        try {
            return webOrdersRepository.getWebOrderByUuid(uuid);
        } catch (Exception e) {
            logger.debug("There is no order number : {}", uuid);
        }
        return null;
    }

    @Override
    public List<Product> getProductsByWebOrderUuid(UUID uuid) {
        try {
            WebOrders order = getWebOrder(uuid);
            return order.getOrderItems();
        } catch (Exception e) {
            logger.debug("There are no items in order: {}", uuid );
        }
        return Collections.emptyList();
    }

    @Override
    public void deleteWebOrderByUuid(UUID uuid) {
        try {
            WebOrders order = getWebOrder(uuid);
            webOrdersRepository.deleteWebOrderByUuid(order.getUuid());
        } catch (Exception e) {
            logger.debug("There is no order with number: {}", uuid);
        }
    }
}
