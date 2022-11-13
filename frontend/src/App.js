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

const App = () => {
  return (
    <BrowserRouter>
      <Header />
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
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
