package com.academic.PcShop.models.subModels;

import com.academic.PcShop.models.Product;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private byte[] data;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

}