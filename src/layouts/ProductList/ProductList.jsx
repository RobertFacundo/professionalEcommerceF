import React from "react";
import { Accordion, Spinner, Box, Text } from "@chakra-ui/react";
import { useProducts } from '../../hooks/useProducts';
import ProductCard from "./ProductCard";
import { categoryImages } from '../../utils/categoryImages'

export default function ProductList({ onOpenModal }) {
    const { products, loading, error } = useProducts();

    if (loading) return <Spinner size='xl' />;
    if (error) return <Text color='red.500'>{error}</Text>;

    const categories = [... new Set(products.map((p) => p.category))];
    console.log(categories)

    return (
        <Box width="70%" mx="auto" mt={8}>
            <Accordion.Root multiple defaultValue={["Granolas"]}>
                {categories.map((category) => {
                    const productsInCategory = products.filter(p => p.category === category);
                    return (
                        <Accordion.Item key={category} value={category} >
                            <Accordion.ItemTrigger>
                                <Box
                                    position="relative"        
                                    flex='1'
                                    fontWeight='bold'
                                    fontSize='lg'
                                    textAlign='center'
                                    bgImage={`url(${categoryImages[category]})`}
                                    bgSize='cover'
                                    bgPosition='center'
                                    color='white'
                                    minH="110px"  
                                    py={6}
                                    borderRadius="md"
                                    overflow="hidden"
                                >
                                    <Box
                                        position="absolute"
                                        top={0}
                                        left={0}
                                        width="100%"
                                        height="100%"
                                        bg="rgba(0,0,0,0.5)" 
                                        zIndex={0}
                                    />
                                    <Box position="relative" zIndex={1} pt={4}>
                                        {category}
                                    </Box>
                                </Box>
                            </Accordion.ItemTrigger>
                            <Accordion.ItemContent>
                                {productsInCategory.map((product) => (
                                    <ProductCard key={product._id} product={product} onOpenModal={onOpenModal} />
                                ))}
                            </Accordion.ItemContent>
                        </Accordion.Item>
                    )
                })}
            </Accordion.Root>
        </Box>
    )
}