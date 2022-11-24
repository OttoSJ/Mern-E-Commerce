import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'
import RegisterScreen from './screens/RegisterScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import EditUsersScreen from './screens/EditUsersScreen'
import OrderListScreen from './screens/OrderListScreen'
import ProductListScreen from './screens/ProductListScreen'

const App = () => {
  const [hasCartItems, setHasCartItems] = useState(false)
  const { cartItems } = useSelector((state) => state.cart)

  useEffect(() => {
    if (cartItems.length > 0) {
      setHasCartItems(true)
    } else {
      setHasCartItems(false)
    }
  }, [cartItems])

  return (
    <BrowserRouter>
      <Header hasCartItems={hasCartItems} />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:productId" element={<ProductScreen />} />
            <Route>
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/cart/:productId" element={<CartScreen />} />
            </Route>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/orders/:orderId" element={<OrderScreen />} />
            <Route path="/user/:userId/edit" element={<EditUsersScreen />} />
            <Route path="/admin/userlist" element={<UserListScreen />} />
            <Route path="/admin/productlist" element={<ProductListScreen />} />
            <Route path="/admin/orderlist" element={<OrderListScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
