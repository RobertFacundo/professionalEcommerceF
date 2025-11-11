import { useState } from "react";
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { toaster } from "../components/ui/toaster";

export default function useStripePayment(clientSecret, orderId, onSuccess) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleStripePayment = async () => {
        if (!stripe || !elements) return;
        setLoading(true);

        const card = elements.getElement(CardElement);

        try {
            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card },
            });

            if (error) {
                toaster.create({
                    status: 'error',
                    title: 'Payment Failed',
                    description: error.message,
                });
                setLoading(false);
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                toaster.create({
                    status: 'success',
                    title: 'Payment successful',
                    description: `Your payment for order ${orderId} was successful!`,
                });

                onSuccess(paymentIntent);
            }
        } catch (err) {
            console.error(err);
            toaster.create({
                status: 'error',
                title: 'Payment Error',
                description: err.message || 'Something went wrong',
            })
        } finally {
            setLoading(false);
        }
    };

    return {
        handleStripePayment,
        loading,
        stripe,
        elements,
    }
}