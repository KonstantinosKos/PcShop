package com.academic.PcShop.repository;

import com.academic.PcShop.models.WebOrders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface WebOrdersRepository extends JpaRepository<WebOrders, Long> {

    void deleteWebOrderByUuid(UUID uuid);

    WebOrders getWebOrderByUuid(UUID uuid);

}
