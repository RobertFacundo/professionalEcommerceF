import { VStack, HStack, Separator, Badge, Text } from '@chakra-ui/react';

export function OrderSummary({ items, total }) {
    return (
        <VStack align="stretch" spacing={2}>
            {items.map((it, index) => (
                <HStack key={`${it._id}-${it.quantity}-${index}`} justify="space-between">
                    <Text>{it.name} x{it.quantity}</Text>
                    <Text>${it.selectedPrice * it.quantity}</Text>
                </HStack>
            ))}
            <Separator />
            <HStack justify="space-between">
                <Text fontWeight="semibold">Total Pedido:</Text>
                <Text>${total}</Text>
            </HStack>
        </VStack>
    );
}