import React, { useState } from "react"
import { Box } from "@chakra-ui/react"
import Header from "./layouts/Header/Header"
import ProductList from "./layouts/ProductList/ProductList"

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  const handleOpenProductModal = (product) => {
    console.log('open product modal for', product)
  }

  return (
    <>
      <Header onOpenCart={() => setIsCartOpen(true)} />
      <Box bg="gray.100" minH="100vh" px={4} py={6}>
        <ProductList onOpenModal={handleOpenProductModal} />
      </Box>
    </>
  )
}

export default App
