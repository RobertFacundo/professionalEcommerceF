import React from 'react';
import { Box, Flex, Image, IconButton, Text, Badge, HStack, Spacer, VisuallyHidden } from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { useSelector } from 'react-redux';

export default function Header({ onOpenCart }) {
    const totalQty = useSelector((state) => state.cart.totalQuantity)

    const handleOpenCart = () => {
        if (onOpenCart) {
            console.log('opening cart...')
            onOpenCart()
        } else {
            console.log('opening cart (placeholder)')
        }
    }

    return (
        <Box as='header' width="100%" boxShadow='sm' bg='white'>
            <Flex align='center' py={3} px={{ base: 4, md: 8 }} maxW='1200px' mx='auto'>
                <HStack spacing={4} alignItems='center'>
                    <Image
                        src='/cereal.png'
                        alt='Ecommerce LOGO'
                        boxSize={{ base: '36px', md: '48px' }}
                        objectFit='contain'
                    />
                    <VisuallyHidden>MERN Ecomerce</VisuallyHidden>
                    <Text fontWeight='bold' fontSize={{ base: 'lg', md: 'xl' }}>
                        MERN Ecommerce - using Stripe and MercadoPago
                    </Text>
                </HStack>

                <Spacer />

                <HStack spacing={3}>
                    <Box position="relative">
                        <IconButton
                            aria-label='Open Cart'
                            as={FiShoppingCart}  // tamaño en pixeles
                            boxSize={12}
                            onClick={handleOpenCart}
                            variant='ghost'
                            p={1}
                            size='lg'
                            transition='all 0.4s ease'
                            _hover={{ transform: 'scale(1.03)', color: 'green.500', bg: 'transparent' }}
                        />
                        {totalQty >= 0 && (
                            <Badge
                                position='absolute'
                                top='-3'
                                right='2'
                                borderRadius='full'
                                px={2}
                                py={1}
                                fontSize='lg'
                                variant='ghost'
                                color='green'
                            >
                                {totalQty}
                            </Badge>
                        )}
                    </Box>
                </HStack>
            </Flex>
        </Box>
    )
}