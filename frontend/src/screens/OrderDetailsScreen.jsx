import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, ListGroup, Table, Image } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails } from '../redux-features/reducers_ajaxCalls/orderReducer'
const OrderDetailsScreen = () => {
  const dispatch = useDispatch()
  const orderId = useParams().orderId
  const { order, isLoading, isError, message } = useSelector(
    (state) => state.order
  )

  console.log(order)
  console.log(isLoading)

  useEffect(() => {
    dispatch(getOrderDetails(orderId))
  }, [])
  return (
    <>
      <Link className="btn btn-light my-3" to="/admin/orderlist">
        {' '}
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{message}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <h4>Customer Details</h4>
              <ListGroup>
                <ListGroup.Item>
                  Customer Name: {order.user.name}
                </ListGroup.Item>
                <ListGroup.Item>
                  Email:
                  <a href={`mailto:${order.user.email}`}> {order.user.email}</a>
                </ListGroup.Item>
                <h4 className="my-2">Address</h4>
                <ListGroup.Item>
                  Street: {order.shippingAddress.address}
                </ListGroup.Item>
                <ListGroup.Item>
                  City: {order.shippingAddress.city}
                </ListGroup.Item>
                <ListGroup.Item>
                  Zip Code: {order.shippingAddress.postalCode}
                </ListGroup.Item>
                <ListGroup.Item>
                  Country: {order.shippingAddress.country}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={6}>
              <h4>Payment Details</h4>
              <ListGroup>
                <ListGroup.Item>
                  Payment Status: {order.paymentResult.status}
                </ListGroup.Item>
                <ListGroup.Item>
                  Paid On: {order.createdAt.split('T')[0]} <br />
                  Time Of Payment: {order.createdAt.split('T')[1].split('.')[0]}
                </ListGroup.Item>
                <ListGroup.Item>
                  Payment Method: {order.paymentMethod}
                </ListGroup.Item>
                <ListGroup.Item>
                  Transaction ID: {order.paymentResult.id}
                </ListGroup.Item>
                <h4 className="my-2">Order Cost</h4>
                <ListGroup.Item>
                  Tax: ${order.taxPrice.toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                  Shipping Cost: ${order.shippingPrice.toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                  Totol: ${order.totalPrice.toFixed(2)}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row className="my-5">
            <Table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Product ID</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems?.map((orderItem) => (
                  <tr>
                    <td>{orderItem.name}</td>
                    <td>{orderItem.qty}</td>
                    <td>
                      <Image
                        className="col-2"
                        src={orderItem.image}
                        fluid
                        rounded
                      />
                    </td>
                    <td>{orderItem.price}</td>
                    {orderItem.product}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </>
      )}
    </>
  )
}

export default OrderDetailsScreen
