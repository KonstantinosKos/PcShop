package com.academic.PcShop.models.ENUM;

public enum Availability {
    AVAILABLE(1, 3),
    NOT_AVAILABLE(9999, 0),
    ORDER(4, 10),
    PRE_ORDER(15, 30);

    private final int min;
    private final int max;

    Availability(int min, int max) {
        this.min = min;
        this.max = max;
    }
}
