import { VStack, Button, Text } from '@chakra-ui/react';
import { CardElement } from '@stripe/react-stripe-js';
import useStripePayment from '../../hooks/useStripePayment';

export function StripeCheckoutForm({ clientSecret, orderId, onSuccess }) {
    const { handleStripePayment, loading } = useStripePayment(clientSecret, orderId, onSuccess);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleStripePayment();
            }}
        >
            <VStack spacing={4} align='stretch'>
                <Text>Enter your card details:</Text>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#32325d",
                                "::placeholder": { color: "#a0aec0" },
                            }
                        }
                    }}
                />
                <Button type='submit' colorScheme='green' isLoading={loading}>
                    Pay
                </Button>
            </VStack>
        </form>
    )
}