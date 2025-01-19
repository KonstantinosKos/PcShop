package com.academic.PcShop.service.webuser;

import com.academic.PcShop.models.ENUM.CardType;
import com.academic.PcShop.models.WebOrders;
import com.academic.PcShop.models.WebUser;
import com.academic.PcShop.models.subModels.CreditCard;
import com.academic.PcShop.repository.WebUserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class WebUserService implements WebUserInterface {

    private static final Logger logger = LoggerFactory.getLogger(WebUserService.class);
    private final WebUserRepository webUserRepository;
    private final PasswordEncoder passwordEncoder;

    public JpaRepository<WebUser, Long> getWebUserRepository() {
        return webUserRepository;
    }

    @Override
    public WebUser createWebUser(WebUser webUser) {
        webUser.setPassword(passwordEncoder.encode(webUser.getPassword()));
        return webUserRepository.save(webUser);
    }

    @Override
    public void updateWebUser(WebUser webUser) {
        WebUser user = getWebUserByUsername(webUser.getUsername());
        if (!Objects.equals(webUser.getPassword(), user.getPassword())) {
            webUser.setPassword(passwordEncoder.encode(webUser.getPassword()));
        }
        webUserRepository.save(webUser);
    }

    @Override
    public WebUser getWebUSerByEmail(String email) {
        return webUserRepository.getWebUserByEmail(email);
    }

    @Override
    public WebUser getWebUserByPhoneNumber(Long phoneNumber) {
        return webUserRepository.getWebUserByPhoneNumber(phoneNumber);
    }

    @Override
    public WebUser getWebUserByUsername(String username) {
        return webUserRepository.getWebUserByUsername(username);
    }

    @Override
    public void deleteWebUserByUsername(String username) {
        try {
            WebUser user = getWebUserByUsername(username);
            webUserRepository.deleteWebUserByUsername(user.getUsername());
        } catch (Exception e) {
            logger.debug("Username: {}, not found", username);
        }
    }

    @Override
    public List<WebOrders> getWebOrdersByUsername(String username) {
        try {
            WebUser user = getWebUserByUsername(username);
            return webUserRepository.getWebOrdersByUsername(user.getUsername());
        } catch (Exception e) {
            logger.debug("There are no orders for Username: {}", username);
        }
        return Collections.emptyList();
    }

    @Override
    public List<WebOrders> getWebOrderByPhoneNumber(Long phoneNumber) {
        try {
            WebUser user = getWebUserByPhoneNumber(phoneNumber);
            return webUserRepository.getWebOrderByPhoneNumber(user.getPhoneNumber());
        } catch (Exception e) {
            logger.debug("There are no orders for Phone Number: {}", phoneNumber);
        }
        return Collections.emptyList();
    }

    @Override
    public List<WebOrders> getWebOrdersByEmail(String email) {
        try {
            WebUser user = getWebUSerByEmail(email);
            return webUserRepository.getWebOrdersByEmail(user.getEmail());
        } catch (Exception e) {
            logger.debug("There are no orders for Email: {}", email);
        }
        return Collections.emptyList();
    }

    @Override
    public WebUser getLogin(String username, String password) {
        WebUser user = getWebUserByUsername(username);
        if (Objects.equals(user.getUsername(), username) && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }
        return null;
    }

    @Override
    public Set<CreditCard> addCreditCard(CreditCard creditCard, Long id) {
        WebUser user = webUserRepository.findById(id).orElseThrow();
        user.getCreditCard().stream()
                .filter(card -> card.getCardType() == CardType.UNKNOWN)
                .findFirst().ifPresent(unknownCard -> user.getCreditCard().remove(unknownCard));
        user.getCreditCard().add(creditCard);
        webUserRepository.save(user);
        return user.getCreditCard();
    }

    @Override
    public Set<CreditCard> getCreditCard(Long id) {
        WebUser user = webUserRepository.findById(id).orElseThrow();
        return user.getCreditCard();
    }
}
