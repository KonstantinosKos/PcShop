package com.academic.PcShop.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@Entity
@NoArgsConstructor
@Table(name = "webOrder")
@SequenceGenerator(name = "idGenerator", sequenceName = "web_order_seq", allocationSize = 1)
public class WebOrders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, updatable = false)
    private UUID uuid = UUID.randomUUID();

    @JoinColumn(name = "webUser_id")
    @ManyToOne
    private WebUser webUser;

    @OneToMany(mappedBy = "webOrder", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Product> orderItems;

    @Column
    private double totalPrice;

    @Column
    private int quantity;
}
