import {
  VStack,
  HStack,
  RadioGroup,
  Text,
} from "@chakra-ui/react";

export default function PresentationSelector({
  presentations,
  selected,
  onSelect,
}) {
  return (
    <RadioGroup.Root value={selected || ""} onValueChange={(e) => onSelect(e.value)}>
      <VStack align="stretch" gap="2">
        {presentations.map((p) => (
          <RadioGroup.Item
            key={p.presentation}
            value={p.presentation}
            borderWidth="1px"
            borderRadius="md"
            px="3"
            py="2"
            cursor="pointer"
            _hover={{ bg: "gray.50" }}
          >
            <RadioGroup.ItemHiddenInput />
            <HStack justify="space-between" w="100%">
              <HStack gap="2">
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>{p.presentation}</RadioGroup.ItemText>
              </HStack>
              <Text fontWeight="medium">${p.price}</Text>
            </HStack>
          </RadioGroup.Item>
        ))}
      </VStack>
    </RadioGroup.Root>
  );
}