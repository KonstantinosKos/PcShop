package com.academic.PcShop.repository;

import com.academic.PcShop.models.WebOrders;
import com.academic.PcShop.models.WebUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WebUserRepository extends JpaRepository<WebUser, Long> {

    WebUser getWebUserByEmail(String email);

    WebUser getWebUserByUsername(String username);

    WebUser getWebUserByPhoneNumber(Long phoneNumber);

    List<WebOrders> getWebOrdersByUsername(String username);

    List<WebOrders> getWebOrdersByEmail(String email);

    List<WebOrders> getWebOrderByPhoneNumber(Long phoneNumber);

    void deleteWebUserByUsername(String username);
}
