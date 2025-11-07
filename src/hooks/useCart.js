import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, updateQuantity, clearCart } from "../redux/slices/cartSlice";

export const useCart = () => {
    const dispatch = useDispatch();
    const { items, totalQuantity, totalPrice } = useSelector((state) => state.cart);

    const add = (product) => dispatch(addToCart(product));
    const remove = (id, presentation) => dispatch(removeFromCart({ id, presentation }));
    const update = (id, presentation, quantity) => dispatch(updateQuantity({ id, presentation, quantity }));
    const clear = () => dispatch(clearCart());

    return { items, totalQuantity, totalPrice, add, remove, update, clear };
}