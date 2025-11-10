import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { toaster } from '../components/ui/toaster';
import { createOrder } from '../redux/slices/orderSlice'
import { useCart } from './useCart';
import axiosInstance from '../api/axiosConfig';

export default function useCheckoutLogic(onClose) {
    const { items, totalPrice, clearCart } = useCart();
    const dispatch = useDispatch();

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [orderResult, setOrderResult] = useState(null);

    const [preferenceId, setPreferenceId] = useState(null);
    const [initPoint, setInitPoint] = useState(null);

    const [buyer, setBuyer] = useState({
        name: "",
        email: "",
        phone: "",
        street: "",
        betweenStreets: "",
        department: "",
        city: "",
        province: "",
        zip: "",
    });

    const [shippingMethod, setShippingMethod] = useState('envio');
    const [paymentMethod, setPaymentMethod] = useState('transferencia');

    const pollerRef = useRef(null);

    const resetCheckout = () => {
        setStep(1);
        setBuyer({
            name: "",
            email: "",
            phone: "",
            street: "",
            betweenStreets: "",
            department: "",
            city: "",
            province: "",
            zip: "",
        });
        setShippingMethod('envio');
        setPaymentMethod('transferencia');
        setOrderResult(null);
        setPreferenceId(null);
        setInitPoint(null);
        if (pollerRef.current) {
            clearInterval(pollerRef.current);
            pollerRef.current = null;
        }
        onClose();
    };

    const startPollingOrder = (orderId, attemptsLimit = 40, intervalMs = 3000) => {
        let attempts = 0;
        if (pollerRef.current) clearInterval(pollerRef.current);

        pollerRef.current = setInterval(async () => {
            attempts++;
            console.log("🔁 Polling order status attempt:", attempts, "orderId:", orderId);
            try {
                const resp = await axiosInstance.get(`/orders/${orderId}`);
                const order = resp.data;
                console.log("🔁 Polled order:", order._id, order.payment?.status, order.status);

                if (order.payment?.status === 'approved' || order.status === 'paid') {
                    clearInterval(pollerRef.current);
                    pollerRef.current = null;
                    setOrderResult({ orderId: order._id, payment: order.payment });
                    setStep(4);
                    if (typeof clearCart === 'function') clearCart();
                } else if (attempts >= attemptsLimit) {
                    clearInterval(pollerRef.current);
                    pollerRef.current = null;
                    toaster.create({ status: "warning", title: "Pago no confirmado", description: "No pudimos confirmar el pago automáticamente. Verificá tu orden más tarde." });
                }
            } catch (error) {
                console.error("Poll error:", err);
            }
        }, intervalMs)
    }

    const handleCreateOrder = async ({ viaWhatsapp = false } = {}) => {

        console.log("🟦 HANDLE CREATE ORDER TRIGGERED");
        console.log("Selected payment method:", paymentMethod);
        console.log("Selected shipping method:", shippingMethod);
        console.log("Buyer info:", buyer);
        console.log("Products:", items);
        console.log("viaWhatsapp?", viaWhatsapp);

        if (!items || items.length === 0) {
            toaster.create({
                type: "error",
                title: "Datos incompletos",
                description: "El nombre es requerido.",
            })
            setStep(1);
            return;
        }

        console.log("🟦 Items before payload:", items);

        const payload = {
            products: items.map((p) => ({
                productId: p._id,
                name: p.name,
                quantity: p.quantity,
                price: p.selectedPrice,
            })),
            buyer: {
                name: buyer.name,
                email: buyer.email,
                address: {
                    street: buyer.street,
                    betweenStreets: buyer.betweenStreets,
                    department: buyer.department,
                    city: buyer.city,
                    province: buyer.province,
                    zip: buyer.zip,
                    phone: buyer.phone,
                },
            },
            shippingMethod,
            paymentMethod: viaWhatsapp ? 'whatsapp' : paymentMethod,
            total: totalPrice,
        };

        console.log("🟪 Final payload sent to createOrder:", payload);

        try {
            setLoading(true);

            const result = await dispatch(createOrder(payload)).unwrap();

            console.log("🟩 createOrder response:", result);

            setOrderResult(result);

            if (paymentMethod === 'mercadopago') {
                console.log("💳 Demo: simulating MercadoPago order...");

                const orderId = result.orderId || result._id;

                 clearCart();

                setInitPoint(result.payment.init_point);
                setOrderResult({
                    orderId,
                    payment: {
                        provider: 'mercadopago',
                        init_point: result.payment.init_point,
                        instructions: `In a real payment flow, the user would be redirected to Mercado Pago at this URL: ${result.payment.init_point}.
                                    After completing the payment, a webhook is triggered in the backend, which updates the order status.
                                    The frontend would then poll the order status and, once updated, conditionally render the CheckoutSuccess component.
                                    Check the console for more information!`            
                    }
                });
                setStep(4);

                return;
            }

            if (viaWhatsapp) {
                console.log("🟨 Simulating WhatsApp flow…");

                const summary = items
                    .map(
                        (it) => `${it.name} x${it.quantity} - $${it.selectedPrice * it.quantity}`
                    )
                    .join("\n");

                // ✅ texto que *se enviaría* por WhatsApp
                const text = `Order:\n${summary}\nTotal: $${totalPrice}\nName: ${buyer.name}\nDirection: ${buyer.street} - ${buyer.city}`;

                // ✅ Simulación para recruiter: estructura JSON limpia
                const jsonData = {
                    simulation: "WhatsApp/Email message preview",
                    order: {
                        buyer,
                        shippingMethod,
                        paymentMethod,
                        items,
                        totalPrice,
                    },
                    messageThatWouldBeSentToWhatsapp: text,
                    createdAt: new Date().toISOString()
                };

                const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
                    type: "application/json"
                });

                const jsonUrl = URL.createObjectURL(blob);
                window.open(jsonUrl, "_blank");

                setOrderResult(jsonData)
                setStep(4)
            }

            if (paymentMethod === 'transferencia') {
                console.log("🟧 Showing bank transfer instructions");
                toaster.create({
                    status: "info",
                    title: "Bank transfer instructions",
                    description:
                        result.payment?.instructions ||
                        "Check the success screen for instructions.",
                });
            }

            if (result?.orderId && typeof clearCart === 'function') {
                console.log("🟥 Executing clearCart()");
                clearCart();
            }
        } catch (error) {
            console.error('create order error:', error);
            toaster.create({
                status: "error",
                title: "Error creando orden",
                description: error?.message || "Ocurrió un error",
            });
        } finally {
            setLoading(false);
            console.log("🟫 handleCreateOrder finalizado");
        }
    };

    return {
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
        handleCreateOrder,
        resetCheckout,
        items,
        totalPrice
    };
}