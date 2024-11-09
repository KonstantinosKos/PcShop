package com.academic.PcShop.models;

import com.academic.PcShop.models.subModels.Address;
import com.academic.PcShop.models.subModels.CreditCard;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@Entity
@NoArgsConstructor
@Table(name = "webUser")
@SequenceGenerator(name = "idGenerator", sequenceName = "web_user_seq", allocationSize = 1)
public class WebUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String userName;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(unique = true, nullable = false)
    private String phoneNumber;

    @Email
    @NotNull
    private String eMail;

    @Embedded
    private CreditCard creditCard;

    @Embedded
    private Address address;

    @OneToMany(mappedBy = "webUser", cascade = CascadeType.ALL)
    private List<WebOrders> orders = new ArrayList<>();

}

