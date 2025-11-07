import { HStack, Button, Text } from "@chakra-ui/react";

export default function QuantityCounter({ quantity, onChange, min = 1, max }) {
  const increment = () => {
    if (max && quantity >= max) return;
    onChange(quantity + 1);
  };

  const decrement = () => {
    if (quantity > min) onChange(quantity - 1);
  };

  return (
    <HStack spacing={3}>
      <Button onClick={decrement} disabled={quantity <= min}>
        -
      </Button>
      <Text fontWeight="medium">{quantity}</Text>
      <Button onClick={increment} disabled={max && quantity >= max}>
        +
      </Button>
    </HStack>
  );
}