import React, { useEffect, useState } from "react"
import { Toaster } from "./components/ui/toaster"
import { Box } from "@chakra-ui/react"
import Header from "./layouts/Header/Header"
import ProductList from "./layouts/ProductList/ProductList"
import CartModal from "./layouts/Cart/CartModal"
import ProductModal from "./layouts/ProductModal/ProductModal"
import CheckoutModal from "./layouts/CheckOut/CheckoutModal"
import { initMercadoPago } from "@mercadopago/sdk-react"

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(()=>{
    const key = import.meta.env.VITE_MP_PUBLIC_KEY;
    if(key) initMercadoPago(key);
     console.log("🔑 Mercado Pago SDK inicializado:", !!key);
  }, [])

  const handleOpenProductModal = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setSelectedProduct(null);
    setIsProductModalOpen(false);
  };

  return (
    <>
      <Header onOpenCart={() => setIsCartOpen(true)} />
      <Box bg="gray.100" minH="100vh" px={4} py={6}>
        <ProductList onOpenModal={handleOpenProductModal} />
      </Box>
      {isCartOpen && (
        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true)
        }} />
      )}
      {selectedProduct && (
        <ProductModal
          isOpen={isProductModalOpen}
          onClose={handleCloseProductModal}
          product={selectedProduct}
        />
      )}
      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
        />
      )}
      <Toaster />
    </>
  )
}

export default App
