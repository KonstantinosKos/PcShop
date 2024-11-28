package com.academic.PcShop.models;

import com.academic.PcShop.models.ENUM.Availability;
import com.academic.PcShop.models.ENUM.Category;
import com.academic.PcShop.models.subModels.Image;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "product")
@SequenceGenerator(name = "idGenerator", sequenceName = "product_seq", allocationSize = 1)
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, updatable = false)
    private UUID uuid = UUID.randomUUID();

    @Column
    private String productName;

    @Column
    private double price;

    @Column
    private Category category;

    @Column
    private String description;

    @Column
    private Availability availability;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Image> images;

    @ManyToOne
    @JoinColumn(name = "web_order_id")
    private WebOrders webOrder;
}
