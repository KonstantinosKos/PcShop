package com.academic.PcShop.models;

import com.academic.PcShop.models.ENUM.Availability;
import com.academic.PcShop.models.ENUM.Category;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

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
    private Set<Image> images;
}
