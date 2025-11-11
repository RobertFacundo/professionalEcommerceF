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
} from '@chakra-ui/react/drawer';
import {
    Box,
    Button,
    VStack,
    Text,
    HStack,
    RadioCard,
    Stack,
    Portal,
    Separator,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import useCheckoutLogic from "../../hooks/useCheckoutLogic";
import { CheckoutForm } from './CustomerForm';
import { PaymentOptions } from './PaymentSelector';
import { OrderSummary } from './OrderSummary';
import { CheckoutSuccess } from './ChekoutSuccess';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { StripeCheckoutForm } from './StripeCheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutModal({ isOpen, onClose }) {
    const {
        step,
        setStep,
        buyer,
        setBuyer,
        shippingMethod,
        setShippingMethod,
        paymentMethod,
        setPaymentMethod,
        loading,
        orderResult,
        setOrderResult,
        handleCreateOrder,
        resetCheckout,
        items,
        totalPrice,
        clearCart
    } = useCheckoutLogic(onClose);

    const stripeOptions = useMemo(() => {
        if (!orderResult?.payment?.clientSecret) return null;
        return {
            clientSecret: orderResult.payment.clientSecret,
            appearance: { theme: 'stripe' }
        }
    }, [orderResult?.payment?.clientSecret])

    return (
        <DrawerRoot
            open={isOpen}
            onOpenChange={(e) => {
                if (!e.open) {
                    resetCheckout();
                }
            }}
            placement="end"
            size="lg"
        >
            <Portal>
                <DrawerBackdrop />
                <DrawerPositioner>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle> {step === 4 ? "Order completed" : "Order Confirmation"}</DrawerTitle>
                            <DrawerCloseTrigger />
                        </DrawerHeader>


                        <DrawerBody>
                            {step !== 4 ? (
                                <VStack spacing={4} align="stretch">
                                    <Box>
                                        <Text fontWeight="semibold">1 - Local</Text>
                                        <Text fontSize="sm">Mar del Plata</Text>
                                    </Box>
                                    <Separator />

                                    <Box>
                                        <Text fontWeight="semibold">2 - Deliver method</Text>
                                        <RadioCard.Root
                                            value={shippingMethod}
                                            onValueChange={(e) => setShippingMethod(e.value)}
                                            defaultValue={shippingMethod || "envio"}
                                        >
                                            <HStack align="stretch">
                                                <RadioCard.Item value="envio">
                                                    <RadioCard.ItemHiddenInput />
                                                    <RadioCard.ItemControl>
                                                        <RadioCard.ItemContent>
                                                            <RadioCard.ItemText>Delivery</RadioCard.ItemText>
                                                        </RadioCard.ItemContent>
                                                        <RadioCard.ItemIndicator />
                                                    </RadioCard.ItemControl>
                                                </RadioCard.Item>

                                                <RadioCard.Item value="retiro">
                                                    <RadioCard.ItemHiddenInput />
                                                    <RadioCard.ItemControl>
                                                        <RadioCard.ItemContent>
                                                            <RadioCard.ItemText>Retiro en local</RadioCard.ItemText>
                                                        </RadioCard.ItemContent>
                                                        <RadioCard.ItemIndicator />
                                                    </RadioCard.ItemControl>
                                                </RadioCard.Item>
                                            </HStack>
                                        </RadioCard.Root>
                                    </Box>
                                    <Separator />

                                    <Box>
                                        <Text fontWeight="semibold">3 - Your personal details</Text>
                                        <CheckoutForm buyer={buyer} setBuyer={setBuyer} />
                                    </Box>

                                    <Separator />
                                    <Box>
                                        <Text fontWeight="semibold">4 - Payment Method</Text>
                                        <PaymentOptions paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
                                    </Box>

                                    <Separator />
                                    <Box>
                                        <Text fontWeight="semibold">Summary order</Text>
                                        <OrderSummary items={items} total={totalPrice} />
                                    </Box>
                                </VStack>
                            ) : (
                                <CheckoutSuccess
                                    order={orderResult}
                                    onClose={resetCheckout}
                                />
                            )}

                            {paymentMethod === 'stripe' && stripeOptions && step !== 4 && (
                                <Elements stripe={stripePromise} options={stripeOptions}>
                                    <StripeCheckoutForm
                                        clientSecret={stripeOptions.clientSecret}
                                        orderId={orderResult.orderId}
                                        onSuccess={(paymentIntent) => {
                                            setStep(4);
                                            if (typeof clearCart === 'function') clearCart()
                                            setOrderResult(prev => ({
                                                ...prev,
                                                paymentIntent,
                                                payment: {
                                                    ...prev.payment,
                                                    status: 'succeeded'
                                                }
                                            }));
                                        }}
                                    >

                                    </StripeCheckoutForm>
                                </Elements>
                            )}
                        </DrawerBody>


                        {step !== 4 && (
                            <DrawerFooter>
                                <HStack w="full" spacing={3}>
                                    <Button variant="ghost" onClick={resetCheckout}>
                                        Cancel
                                    </Button>

                                    <Button
                                        colorScheme="green"
                                        isLoading={loading}
                                        onClick={() => {
                                            if (paymentMethod === 'whatsapp')
                                                return handleCreateOrder({ viaWhatsapp: true });

                                            return handleCreateOrder();
                                        }}
                                    >
                                        {paymentMethod === 'transferencia'
                                            ? `Confirme and receive instructions ($${totalPrice})`
                                            : paymentMethod === 'whatsapp'
                                                ? `Send whatsapp ($${totalPrice})`
                                                : `Pay ($${totalPrice})`}
                                    </Button>
                                </HStack>
                            </DrawerFooter>
                        )}
                    </DrawerContent>
                </DrawerPositioner>
            </Portal>
        </DrawerRoot>
    );
}