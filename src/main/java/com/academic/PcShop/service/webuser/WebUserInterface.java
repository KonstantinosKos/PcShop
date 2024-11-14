package com.academic.PcShop.service.webuser;

import com.academic.PcShop.models.WebOrders;
import com.academic.PcShop.models.WebUser;

import java.util.List;

public interface WebUserInterface {

    WebUser createWebUser(WebUser webUser);

    void updateWebUser(WebUser webUser);

    WebUser getWebUSerByEmail(String email);

    WebUser getWebUserByPhoneNumber(Long phoneNumber);

    WebUser getWebUserByUsername(String username);

    void deleteWebUserByUsername(String username);

    List<WebOrders> getWebOrdersByUsername(String username);

    List<WebOrders> getWebOrderByPhoneNumber(Long phoneNumber);

    List<WebOrders> getWebOrdersByEmail(String email);

}
