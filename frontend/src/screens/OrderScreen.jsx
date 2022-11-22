import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Loader from '../components/Loader.jsx'
import Message from '../components/Message'
import { getOrderDetails } from '../redux-features/reducers_ajaxCalls/orderReducer.js'
import {
  orderPayment,
  reset,
} from '../redux-features/reducers_ajaxCalls/orderPaymentReducer.js'

const OrderScreen = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const [sdkReady, setSdkReady] = useState(false)
  const { order, isError, isLoading } = useSelector((state) => state.order)
  const {
    orderPayment: orderPayStatus,
    isLoading: loadingPay,
    isSuccess: successPay,
  } = useSelector((state) => state.orderPayment)

  let itemsTotal = order.orderItems?.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )
  //   console.log(orderPayStatus, loadingPay, successPay)
  //   console.log(order.isPaid)
  //   console.log(order._id)
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || order._id !== params.orderId) {
      dispatch(getOrderDetails(params.orderId))
      dispatch(reset())
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, params.orderId, order, successPay, sdkReady])

  const successPaymentHander = (paymentResult) => {
    dispatch(orderPayment(paymentResult))
  }

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message variant="danger">{isError}</Message>
  ) : (
    <>
      <h2>Order Number {order._id}</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h5>Shipping</h5>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.country},{' '}
                {order.shippingAddress.postalCode}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">
                  Not Delivered {order.deliveredAt}
                </Message>
              )}
              <h5>Customer</h5>
              <p>
                <strong>Name: </strong> {order.user.name} <br />
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}> {order.user.email}</a>
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h5>Payment Method</h5>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid {order.paidAt}</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h5>Order Items</h5>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
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
                <Col>${itemsTotal}</Col>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex p-3">
                <Col>Shipping</Col>
                <Col>${order.shippingPrice}</Col>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex p-3">
                <Col>Tax</Col>
                <Col>${order.taxPrice.toFixed(2)}</Col>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex p-3">
                <Col>Total</Col>
                <Col>${order.totalPrice.toFixed(2)}</Col>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHander}
                    >
                      Button
                    </PayPalButton>
                  )}
                </ListGroup.Item>
              )}
            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
