import {
    DrawerRoot,
    DrawerBackdrop,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    DrawerTitle,
    DrawerCloseTrigger,
    DrawerPositioner,
} from "@chakra-ui/react/drawer";
import { Button, Box, Text, VStack, Textarea, Portal } from "@chakra-ui/react";
import { useCart } from "../../hooks/useCart";
import CartItem from './CartItem'

export default function CartDrawer({ isOpen, onClose }) {
    const { items, totalPrice } = useCart();

    console.log(totalPrice,'log del cartMODALtotal price!!!')

    return (
        <DrawerRoot
            open={isOpen}
            onOpenChange={(e) => !e.open && onClose()}
            placement="start"   
            size="md"
        >
            <Portal>
                <DrawerBackdrop />
                <DrawerPositioner>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Your Cart</DrawerTitle>
                            <DrawerCloseTrigger />
                        </DrawerHeader>

                        <DrawerBody>
                            {items.length === 0 ? (
                                <Box textAlign="center" py={8}>
                                    <Text fontSize="lg" color="gray.600">
                                        Your Cart is Empty
                                    </Text>
                                    <Text fontSize="sm" color="gray.500">
                                        You can add products from our catalog.
                                    </Text>
                                </Box>
                            ) : (
                                <VStack spacing={4} align="stretch">
                                    {items.map((item) => (
                                        <CartItem key={`${item._id}-${item.selectedPresentation}`} item={item} />
                                    ))}
                                    <Box mt={4}>
                                        <Text fontWeight="semibold" mb={2}>
                                            Commentaries:
                                        </Text>
                                        <Textarea
                                            placeholder="Add commentaries to your order!"
                                            resize="none"
                                        />
                                    </Box>
                                </VStack>
                            )}
                        </DrawerBody>

                        {items.length > 0 && (
                            <DrawerFooter>
                                <Button colorScheme="blue" w="full" onClick={onClose}>
                                    Checkout (${totalPrice})
                                </Button>
                            </DrawerFooter>
                        )}
                    </DrawerContent>
                </DrawerPositioner>
            </Portal>
        </DrawerRoot>
    );
}
