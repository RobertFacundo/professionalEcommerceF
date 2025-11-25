# MERN Ecommerce / Front End

Link to backend: [Recipe Finder Backend](https://github.com/RobertFacundo/professionalEcommerceB)

A fully functional e-commerce frontend, built with React, Redux, and integrated with Mercado Pago and Stripe for payments. This project allows users to browse categories, view products, add them to the cart, and complete checkout with multiple payment options.

---

## 🚀 Technologies Used

- **React** (Vite) with **Hooks**
- **Redux Toolkit**
- **Axios**
- **Chakra UI**
- **Stripe & Mercado Pago**
- **JavaScript / JSX**
- **SCSS / CSS Modules**

---

## API Services

The frontend communicates with the backend via Axios and provides these services:

- **Payment Service** (`paymentService.js`)
  - `createMercadoPagoPayment(paymentData)`
  - `createStripePaymentIntent(paymentData)`

- **Order Service** (`orderService.js`)
  - `createOrder(orderData)`
  - `getAllOrders()`
  - `getOrderById(id)`
  - `updateOrder(id, updateData)`
  - `deleteOrder(id)`

- **Product Service** (`productService.js`)
  - Handles CRUD operations for products (used by admin panel)

---

## 💡 Key Features

- Dynamic product listing with categories and accordions
- Product modal with quantity selector and add-to-cart functionality
- Persistent cart using Redux and localStorage
- Checkout modal with form validation
- Payment integration with **Stripe** and **Mercado Pago**
- Admin panel (CRUD for products) ready to connect
- Responsive design

---

## 📂 Project Structure
```js
SRC
|   App.css
|   App.jsx
|   index.css
|   main.jsx
|   theme.js
|
+---api
|       axiosConfig.js
|       orderService.js
|       paymentService.js
|       productService.js
|
+---assets
+---components
|   \---ui
|           color-mode.jsx
|           provider.jsx
|           toaster.jsx
|           tooltip.jsx
|
+---hooks
|       useCart.js
|       useCheckoutLogic.js
|       useProducts.js
|       useStripePayment.js
|
+---layouts
|   +---Cart
|   |       CartItem.jsx
|   |       CartModal.jsx
|   |       CartSummary.jsx
|   |
|   +---CheckOut
|   |       CheckoutModal.jsx
|   |       ChekoutSuccess.jsx
|   |       CustomerForm.jsx
|   |       OrderSummary.jsx
|   |       PaymentSelector.jsx
|   |       StripeCheckoutForm.jsx
|   |
|   +---Footer
|   |       Footer.jsx
|   |
|   +---Header
|   |       Header.jsx
|   |
|   +---ProductList
|   |       ProductCard.jsx
|   |       ProductList.jsx
|   |
|   \---ProductModal
|           PresentationSelector.jsx
|           ProductModal.jsx
|           QuantityCounter.jsx
|
+---redux
|   |   store.js
|   |
|   \---slices
|           cartSlice.js
|           orderSlice.js
|           paymentSlice.js
|           productSlice.js
|
\---utils
        categoryImages.js
        getProductImageUrl.js
```
---
## 📬 Contact

- LinkedIn: [Facundo Robert](https://www.linkedin.com/in/robertfacundodev/)
- Portfolio: [My Portfolio](https://facundorobert.vercel.app/) 
- Email: robertf.coder@gmail.com
