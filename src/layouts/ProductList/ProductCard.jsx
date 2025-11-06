import React from 'react';
import { Box, Image, Text, Flex, Button } from '@chakra-ui/react';
import { getProductImageUrl } from '../../utils/getProductImageUrl';

export default function ProductCard({ product, onOpenModal }) {
    return (
        <Box
            borderWidth="1px"
            borderRadius="md"
            p={4}
            mb={4}
            bg="white"
            shadow="sm"
            _hover={{ shadow: "lg", transform: "none", transition: "0.3s" }}
        >
            {/* Contenedor principal */}
            <Flex
                direction={{ base: 'column', md: 'row' }}
                align={{ base: 'center', md: 'start' }}
                justify="space-between"
            >
                {/* Imagen */}
                <Image
                    src={getProductImageUrl(product.image)}
                    alt={product.name}
                    boxSize={{ base: '80px', md: '100px' }}
                    objectFit="cover"
                    borderRadius="md"
                    mb={{ base: 4, md: 0 }}
                    mr={{ md: 4 }}
                />

                {/* Contenido central */}
                <Flex
                    direction="column"
                    flex="1"
                    textAlign={{ base: 'center', md: 'left' }}
                    mb={{ base: 4, md: 0 }}
                    align={{ base: 'center', md: 'flex-start' }}
                >
                    <Text fontWeight="bold" fontSize="lg" mb={1}>
                        {product.name}
                    </Text>
                    <Text fontSize="sm" color="gray.600" mb={2}>
                        {product.description || 'No description'}
                    </Text>
                    <Text fontSize="md" color="green.600">
                        {product.prices[0].presentation}- ${product.prices[0].price}
                    </Text>
                </Flex>

                {/* Botón */}
                <Button
                    colorScheme="teal"
                    onClick={() => onOpenModal(product)}
                    size="sm"
                    alignSelf={{ base: 'center', md: 'center' }}
                    ml={{ md: 4 }}
                >
                    Show More
                </Button>
            </Flex>
        </Box>
    );
}
