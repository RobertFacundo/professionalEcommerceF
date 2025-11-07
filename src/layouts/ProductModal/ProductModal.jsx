import {
  DrawerRoot,
  DrawerBackdrop,
  DrawerPositioner,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  DrawerCloseTrigger,
} from "@chakra-ui/react/drawer";
import {
  Box,
  Text,
  Image,
  VStack,
  HStack,
  Button,
  Textarea,
  Portal,
} from "@chakra-ui/react";
import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import PresentationSelector from "./PresentationSelector";
import QuantityCounter from "./QuantityCounter";
import { getProductImageUrl } from "../../utils/getProductImageUrl";

export default function ProductModal({ product, isOpen, onClose }) {
  const { add } = useCart();

  const [selectedPresentation, setSelectedPresentation] = useState(null);
  const [quantity, setQuantity] = useState(product.minQuantity || 1);
  const [comments, setComments] = useState("");

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedPresentation) return;

    const selectedPriceObj = product.prices.find(
      (p)=>p.presentation === selectedPresentation
    )

    const selectedPrice = selectedPriceObj ? selectedPriceObj.price : 0;

    add({
      ...product,
      selectedPresentation,
      selectedPrice,
      quantity,
      comments,
    });

    onClose();
  };

  return (
    <DrawerRoot open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <DrawerBackdrop />
        <DrawerPositioner placement="end">
          <DrawerContent maxW="450px">
            <DrawerHeader>
              <DrawerTitle>{product.name}</DrawerTitle>
              <DrawerCloseTrigger />
            </DrawerHeader>

            <DrawerBody>
              <VStack spacing={5} align="stretch">
                {/* Imagen del producto */}
                <Image
                  src={getProductImageUrl(product.image)}
                  alt={product.name}
                  borderRadius="md"
                  objectFit="cover"
                  w="100%"
                  h="200px"
                />

                {/* Descripción */}
                <Text fontSize="md" color="gray.700">
                  {product.description}
                </Text>

                {/* Selector de presentación */}
                <Box>
                  <Text fontWeight="semibold" mb={2}>
                    Choose Presentation
                  </Text>
                  <PresentationSelector
                    presentations={product.prices}
                    selected={selectedPresentation}
                    onSelect={setSelectedPresentation}
                  />
                </Box>

                {/* Selector de cantidad */}
                <Box>
                  <Text fontWeight="semibold" mb={2}>
                    Quantity
                  </Text>
                  <QuantityCounter
                    quantity={quantity}
                    onChange={setQuantity}
                    min={product.minQuantity}
                    max={product.stock}
                  />
                </Box>

                {/* Comentarios */}
                <Box>
                  <Text fontWeight="semibold" mb={2}>
                    Comments
                  </Text>
                  <Textarea
                    placeholder="Add any notes to your order..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    resize="none"
                  />
                </Box>
              </VStack>
            </DrawerBody>

            <DrawerFooter>
              <Button
                colorScheme="teal"
                w="full"
                size="md"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerPositioner>
      </Portal>
    </DrawerRoot>
  );
}
