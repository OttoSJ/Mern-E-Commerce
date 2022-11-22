import React, { useEffect } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import {
  addCartItem,
  removeCartItem,
} from '../redux-features/reducers_ajaxCalls/cartReducer'
import { reset as resetCart } from '../redux-features/reducers_ajaxCalls/cartReducer.js'

const CartScreen = () => {
  const { productId } = useParams()
  let location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  let qty = location.search ? Number(location.search.split('=')[1]) : 1

  useEffect(() => {
    if (!user) {
      dispatch(resetCart())
      navigate('/')
    }
    if (productId) {
      dispatch(addCartItem({ productId, qty }))
    }
  }, [dispatch, productId, qty, user, navigate])

  const updateQty = (e, item) => {
    dispatch(
      addCartItem({ productId: item.product, qty: Number(e.target.value) })
    )
  }

  const removeFromCartHandler = (item) => {
    dispatch(removeCartItem(item.product))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length > 0 ? (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => updateQty(e, item)}
                    >
                      {[...Array(item?.countInStock).keys()].map((x) => (
                        <option key={x + 1}>{Number(x) + 1}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Total items (
                {cartItems &&
                  cartItems.reduce((total, item) => total + item.qty, 0)}
                )
              </h2>
              $
              {cartItems &&
                cartItems
                  .reduce((total, item) => total + item.qty * item.price, 0)
                  .toFixed(2)}
            </ListGroup.Item>

            <Button
              type="button"
              className="btn-block m-3"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              {cartItems.length === 0
                ? 'Your Cart Is Empty'
                : 'Proceed To Checkout'}
            </Button>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
