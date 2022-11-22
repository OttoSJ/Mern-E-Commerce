import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps.jsx'
import Message from '../components/Message'
import { addOrder } from '../redux-features/reducers_ajaxCalls/orderReducer.js'

const PlaceOrderScreen = () => {
  const [step] = useState(3)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.auth)
  const { order, isError, isSuccess } = useSelector((state) => state.order)

  let itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  let shippingPrice = itemsPrice > 100 ? 0 : 10

  let taxPrice = itemsPrice * 0.05

  let totalPrice = taxPrice + itemsPrice + shippingPrice

  const placeOrderHandler = () => {
    const orderDetails = {
      cartItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      taxPrice: Number(taxPrice.toFixed(2)),
      shippingPrice: Number(shippingPrice.toFixed(2)),
      totalPrice: Number(totalPrice.toFixed(2)),
      userToken: user.token,
    }

    dispatch(addOrder(orderDetails))
  }
  const isOrder = localStorage.getItem('order')

  useEffect(() => {
    if (isSuccess && isOrder) {
      navigate(`/orders/${order._id}`)
    }
  }, [isSuccess, navigate, order._id, isOrder])

  return (
    <>
      <CheckoutSteps step={step} />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                {cart.shippingAddress.country},{' '}
                {cart.shippingAddress.postalCode},
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                {' '}
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={5}>
                          {item.qty} x {item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex p-3">
                <Col>Items</Col>
                <Col>${itemsPrice}</Col>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex p-3">
                <Col>Shipping</Col>
                <Col>${shippingPrice}</Col>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex p-3">
                <Col>Tax</Col>
                <Col>${taxPrice.toFixed(2)}</Col>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex p-3">
                <Col>Total</Col>
                <Col>${totalPrice.toFixed(2)}</Col>
              </ListGroup.Item>
              <ListGroup>
                {isError && <Message variant="danger">{isError}</Message>}
              </ListGroup>
              <Button
                type="button"
                className="btn-block m-2"
                disabled={cart.cartItems === 0}
                onClick={placeOrderHandler}
              >
                {' '}
                Place Order
              </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
