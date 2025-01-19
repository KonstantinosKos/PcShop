package com.academic.PcShop.models.subModels;

import com.academic.PcShop.models.ENUM.CardType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "credit_cards")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CreditCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name_on_card")
    private String nameOnCard;

    @Column(name = "number_on_card")
    private String numberOnCard;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/yyyy")
    @Column(name = "card_expire_date")
    private Date cardExpireDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "card_type")
    @JsonDeserialize(using = CardType.CardTypeDeserializer.class)
    private CardType cardType;

}
