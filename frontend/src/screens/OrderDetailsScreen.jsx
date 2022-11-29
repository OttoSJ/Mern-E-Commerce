import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, ListGroup, Table, Image, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  getOrderDetails,
  reset,
} from '../redux-features/reducers_ajaxCalls/orderReducer'
import { orderDelivery } from '../redux-features/reducers_ajaxCalls/orderDeliveryReducer'
const OrderDetailsScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const orderId = useParams().orderId
  const { user } = useSelector((state) => state.auth)
  const { order, isLoading, isError, message } = useSelector(
    (state) => state.order
  )

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    dispatch(getOrderDetails(orderId))
  }, [dispatch, orderId, navigate, user])

  const handleDelivered = async () => {
    await dispatch(orderDelivery({ orderId, deliveryStatus: true }))
    await dispatch(reset())
    navigate('/admin/orderlist')
  }

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
                  Customer Name: {order.user?.name}
                </ListGroup.Item>
                <ListGroup.Item>
                  Email:{' '}
                  <a href={`mailto:${order.user?.email}`}>
                    {order.user?.email}
                  </a>
                </ListGroup.Item>
                <h4 className="my-2">Address</h4>
                <ListGroup.Item>
                  Street: {order.shippingAddress?.address}
                </ListGroup.Item>
                <ListGroup.Item>
                  City: {order.shippingAddress?.city}
                </ListGroup.Item>
                <ListGroup.Item>
                  Zip Code: {order.shippingAddress?.postalCode}
                </ListGroup.Item>
                <ListGroup.Item>
                  Country: {order.shippingAddress?.country}
                </ListGroup.Item>
                <h4 className="my-2">Delivery Status</h4>
                <ListGroup.Item>
                  {order.isDelivered
                    ? `Delivered On: ${order.deliveredAt.substring(0, 10)}`
                    : 'Deleivery Status: Pending'}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={6}>
              <h4>Payment Details</h4>
              <ListGroup>
                <ListGroup.Item>
                  Payment Status: {order.paymentResult?.status}
                </ListGroup.Item>
                <ListGroup.Item>
                  Paid On: {order.createdAt?.split('T')[0]} <br />
                  Time Of Payment:{' '}
                  {order.createdAt?.split('T')[1].split('.')[0]}
                </ListGroup.Item>
                <ListGroup.Item>
                  Payment Method: {order?.paymentMethod}
                </ListGroup.Item>
                <ListGroup.Item>
                  Transaction ID: {order.paymentResult?.id}
                </ListGroup.Item>
                <h4 className="my-2">Order Cost</h4>
                <ListGroup.Item>
                  Tax: ${order.taxPrice?.toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                  Shipping Cost: ${order?.shippingPrice?.toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                  Totol: ${order?.totalPrice?.toFixed(2)}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          <Row className="my-5">
            <Table striped bordered responsive className="table-sm">
              <thead>
                <tr>
                  <th className="col-3">Product Name</th>
                  <th>Quantity</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Product ID</th>
                  {!user.isAdmin ? (
                    <th>
                      <nobr>Review</nobr>
                    </th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {order.orderItems?.map((orderItem) => (
                  <tr key={orderItem._id}>
                    <td>{orderItem.name}</td>
                    <td>{orderItem.qty}</td>
                    <td>
                      <Image
                        style={{
                          height: '4rem',
                          width: '6rem',
                          objectFit: 'fill',
                        }}
                        src={orderItem.image}
                        fluid
                        rounded
                      />
                    </td>
                    <td>{orderItem.price}</td>
                    <td>{orderItem.product}</td>
                    {!user.isAdmin ? (
                      <td>
                        <LinkContainer
                          to={`/reviews/${orderItem.product}/${orderId}`}
                        >
                          <Button variant="light" className="btn-sm m-1">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>

          {user.isAdmin ? (
            <Button disabled={order?.isDelivered} onClick={handleDelivered}>
              {order?.isDelivered ? 'Delivered' : 'Mark As Delivered'}
            </Button>
          ) : null}
        </>
      )}
    </>
  )
}

export default OrderDetailsScreen
