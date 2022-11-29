import React, { useEffect } from 'react'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getAllOrders } from '../redux-features/reducers_ajaxCalls/orderReducer'

const OrderListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { allOrders, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.order
  )
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/login')
    }

    dispatch(getAllOrders())
  }, [dispatch, navigate, user?.isAdmin, isSuccess])

  return (
    <>
      <Row className="align-items-center ">
        <Col>
          <h1>Orders</h1>
        </Col>
      </Row>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          Error has occurred retrieving the products: {message}
        </Message>
      ) : (
        <>
          <Table striped bordered responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>PAID</th>
                <th>
                  <nobr>PAID ON</nobr>
                </th>
                <th>TOTAL</th>
                <th>DELIVERED</th>
                <th>
                  <nobr>DELIVERY DATE</nobr>
                </th>
                <th>
                  <nobr>ORDERED ON</nobr>
                </th>
                <th>EMAIL</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allOrders?.map((order) => (
                <tr key={order._id}>
                  <td>
                    {' '}
                    <a href={`/orderdetails/${order._id}`}>{order?._id}</a>{' '}
                  </td>

                  <td>
                    {order?.isPaid ? (
                      <i
                        className="fas fa-check"
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order?.isPaid ? order?.paidAt.substring(0, 10) : 'Pending'}
                  </td>
                  <td>${order?.totalPrice}</td>
                  <td>
                    {order?.isDelivered ? (
                      <i
                        className="fas fa-check"
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}{' '}
                  </td>
                  <td>
                    {order?.isDelivered
                      ? order?.deliveredAt.substring(0, 10)
                      : 'Pending'}
                  </td>
                  <td>{(order?.createdAt).split('T')[0]}</td>
                  <td>
                    <a href={`mailto:${order?.paymentResult?.email_address}`}>
                      {order?.paymentResult?.email_address}
                    </a>
                  </td>
                  <td>
                    <LinkContainer to={`/orderdetails/${order._id}`}>
                      <Button variant="light" className="btn-sm m-1">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default OrderListScreen
