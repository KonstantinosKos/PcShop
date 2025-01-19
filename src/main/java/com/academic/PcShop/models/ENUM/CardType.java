package com.academic.PcShop.models.ENUM;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.io.IOException;

public enum CardType {
    VISA, MASTERCARD,UNKNOWN;

    @JsonDeserialize(using = CardTypeDeserializer.class)
    public static class CardTypeDeserializer extends JsonDeserializer<CardType> {
        @Override
        public CardType deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
            String value = p.getText();
            if (value == null || value.trim().isEmpty()) {
                return CardType.UNKNOWN;
            }
            try {
                int number = Integer.parseInt(value.trim());
                return switch (number) {
                    case 0 -> CardType.VISA;
                    case 1 -> CardType.MASTERCARD;
                    default -> CardType.UNKNOWN;
                };
            } catch (IllegalArgumentException e) {
                return CardType.UNKNOWN;
            }
        }
    }


}