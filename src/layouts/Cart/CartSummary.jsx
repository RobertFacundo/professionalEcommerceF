import React from "react";
import { Box, Text, Button, VStack, HStack } from "@chakra-ui/react";
import { useCart } from "../hooks/useCart";

export default function CartSummary({ totalPrice, onClose }) {
    const { clear } = useCart();

    return (
        <VStack width="100%" spacing={3} align="stretch">
            <HStack justify="space-between">
                <Text fontWeight="bold">Total:</Text>
                <Text fontSize="lg" fontWeight="bold" color="green.600">
                    ${totalPrice.toFixed(2)}
                </Text>
            </HStack>

            <HStack justify="space-between">
                <Button
                    colorScheme="green"
                    width="full"
                    onClick={() => {
                        console.log("Checkout modal próximamente...");
                        onClose();
                    }}
                >
                    Checkout
                </Button>

                <Button variant="ghost" colorScheme="red" onClick={clear}>
                    Clear Cart
                </Button>
            </HStack>
        </VStack>
    )
}