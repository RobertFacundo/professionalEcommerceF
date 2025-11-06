import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from "../redux/slices/productSlice";

export const useProducts = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items || []);
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    return { products, loading, error };
}