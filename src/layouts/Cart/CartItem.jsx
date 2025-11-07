import React from 'react';
import {
    HStack,
    Box,
    Text,
    IconButton,
    Image,
    NumberInput,
} from "@chakra-ui/react";
import { FiTrash2 } from 'react-icons/fi';
import { useCart } from '../../hooks/useCart';
import { getProductImageUrl } from '../../utils/getProductImageUrl';

export default function CartItem({ item }) {
    const { update, remove } = useCart();

    const handleQuantityChange = (details) => {
        const newValue = parseInt(details.value, 10);
        if (!isNaN(newValue) && newValue > 0) {
            update(item._id, item.selectedPresentation, newValue);
        }
    };

    return (
        <HStack
            spacing={4}
            align="center"
            justify="space-between"
            p={3}
            borderWidth="1px"
            borderRadius="md"
            bg="white"
            boxShadow="sm"
        >
            <HStack spacing={3}>
                <Image
                    src={getProductImageUrl(item.image)}
                    alt={item.name}
                    boxSize="60px"
                    objectFit="cover"
                    borderRadius="md"
                />
                <Box>
                    <Text fontWeight="bold">{item.name}</Text>
                    <Text color="gray.600">${item.selectedPrice} ({item.selectedPresentation})</Text>
                </Box>
            </HStack>
            <HStack spacing={2}>
                <NumberInput.Root
                    value={item.quantity.toString()}
                    min={1}
                    onValueChange={handleQuantityChange}
                    size="sm"
                    width="90px"
                >
                    <NumberInput.Control>
                        <NumberInput.DecrementTrigger />
                        <NumberInput.IncrementTrigger />
                    </NumberInput.Control>
                    <NumberInput.Input />
                </NumberInput.Root>

                <IconButton
                    as={FiTrash2}
                    colorScheme='red'
                    variant='ghost'
                    size='sm'
                    aria-label='Delete product'
                    onClick={() => remove(item._id, item.selectedPresentation)}
                />
            </HStack>
        </HStack>
    )
}