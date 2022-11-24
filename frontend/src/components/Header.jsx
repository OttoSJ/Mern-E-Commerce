import React, { useEffect } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout, reset } from '../redux-features/reducers_ajaxCalls/authReducer'
import { reset as resetCart } from '../redux-features/reducers_ajaxCalls/cartReducer.js'
import { reset as resetOrder } from '../redux-features/reducers_ajaxCalls/orderReducer.js'

const Header = ({ hasCartItems }) => {
  const cart = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let { cartItems } = cart

  useEffect(() => {
    if (!user) {
      dispatch(resetCart())
    }
  }, [user, navigate, cartItems, dispatch])

  const logoutHandler = () => {
    dispatch(logout())
    dispatch(reset())
    localStorage.removeItem('cartItems')
    dispatch(resetCart())
    dispatch(resetOrder())
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            ProShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="ml-auto">
              <span className="cart-items">
                {!hasCartItems ? 0 : cartItems.length}
              </span>
              <Nav.Link as={Link} to="/cart">
                {' '}
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>
              {user && !user?.isAdmin ? (
                <NavDropdown title={user?.name.split(' ')[0]} id="username">
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : !user && !user?.isAdmin ? (
                <Nav.Link as={Link} to="/login">
                  <i className="fas fa-user px-1"></i>Sign In
                </Nav.Link>
              ) : (
                <NavDropdown title="Admin" id="adminmenu">
                  <NavDropdown.Item as={Link} to="/admin/userlist">
                    Users
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/admin/productlist">
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/admin/orderlist">
                    Orders
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
