import { Stack, RadioCard } from "@chakra-ui/react";

export function PaymentOptions({ paymentMethod, setPaymentMethod }) {
    return (
        <RadioCard.Root
            value={paymentMethod}
            onValueChange={(e) => setPaymentMethod(e.value)}
            defaultValue={paymentMethod || "transferencia"}
        >
            <Stack gap="3">

                <RadioCard.Item value="transferencia">
                    <RadioCard.ItemHiddenInput />
                    <RadioCard.ItemControl>
                        <RadioCard.ItemContent>
                            <RadioCard.ItemText>Bank Transfer</RadioCard.ItemText>
                        </RadioCard.ItemContent>
                        <RadioCard.ItemIndicator />
                    </RadioCard.ItemControl>
                </RadioCard.Item>

                <RadioCard.Item value="mercadopago">
                    <RadioCard.ItemHiddenInput />
                    <RadioCard.ItemControl>
                        <RadioCard.ItemContent>
                            <RadioCard.ItemText>Mercado Pago</RadioCard.ItemText>
                        </RadioCard.ItemContent>
                        <RadioCard.ItemIndicator />
                    </RadioCard.ItemControl>
                </RadioCard.Item>

                <RadioCard.Item value="stripe">
                    <RadioCard.ItemHiddenInput />
                    <RadioCard.ItemControl>
                        <RadioCard.ItemContent>
                            <RadioCard.ItemText>Card (Stripe)</RadioCard.ItemText>
                        </RadioCard.ItemContent>
                        <RadioCard.ItemIndicator />
                    </RadioCard.ItemControl>
                </RadioCard.Item>

                <RadioCard.Item value="whatsapp">
                    <RadioCard.ItemHiddenInput />
                    <RadioCard.ItemControl>
                        <RadioCard.ItemContent>
                            <RadioCard.ItemText>Whatsapp</RadioCard.ItemText>
                        </RadioCard.ItemContent>
                        <RadioCard.ItemIndicator />
                    </RadioCard.ItemControl>
                </RadioCard.Item>
            </Stack>
        </RadioCard.Root>
    );
}