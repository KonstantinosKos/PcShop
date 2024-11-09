package com.academic.PcShop.models.subModels;

import com.academic.PcShop.models.ENUM.CardType;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Embeddable
public class CreditCard {

    private String nameOnCard;
    private Date cardExpireDate;
    private CardType cardType;
}
