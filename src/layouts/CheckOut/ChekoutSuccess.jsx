import { Box, Text, Button } from '@chakra-ui/react';

export function CheckoutSuccess({ order, onClose }) {
    return (
        <Box p={6}>
            <Text fontSize="xl" fontWeight="bold">✅ Purchase Successful</Text>
            <Text mt={2}>Order ID: {order?.orderId || order?.id || '—'}</Text>
            <Text mt={2}>Payment Method: {order?.payment?.provider || '—'}</Text>
            {order?.payment?.instructions && (
                <Text mt={2} fontSize="sm" color="gray.600">
                    {order.payment.instructions}
                </Text>
            )}
            <Button mt={4} colorScheme="blue" onClick={onClose}>Close</Button>
        </Box>
    );
}