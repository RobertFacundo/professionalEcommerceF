import React, { useState } from "react"
import { Box } from "@chakra-ui/react"
import Header from "./layouts/Header/Header"
import ProductList from "./layouts/ProductList/ProductList"
import CartModal from "./layouts/Cart/CartModal"
import ProductModal from "./layouts/ProductModal/ProductModal"

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      )}
      {selectedProduct && (
        <ProductModal
          isOpen={isProductModalOpen}
          onClose={handleCloseProductModal}
          product={selectedProduct}
        />
      )}
    </>
  )
}

export default App
