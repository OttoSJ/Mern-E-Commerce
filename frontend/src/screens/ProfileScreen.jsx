import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Form, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { updateUser } from '../redux-features/reducers_ajaxCalls/authReducer.js'
import { getAllMyOrders } from '../redux-features/reducers_ajaxCalls/orderReducer.js'

const ProfileScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)
  // const [orders, setOrders] = useState([])

  const [userMessage, setUserMessage] = useState(null)
  const { isLoading, isError, user, message } = useSelector(
    (state) => state.auth
  )
  const {
    myOrders,
    isLoading: loadingOrders,
    isError: errorOrders,
  } = useSelector((state) => state.order)

  const [updateUserInfo, setUpdateUserInfo] = useState({
    name: user?.name,
    email: user?.email,
    password: '',
    confirmPassword: '',
    token: user?.token,
  })
  const { name, email, password, confirmPassword } = updateUserInfo

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    dispatch(getAllMyOrders())
  }, [navigate, user, dispatch])

  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      return setUserMessage('Passwords must match')
    }
    dispatch(updateUser(updateUserInfo))

    if (user.success) {
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    }
  }

  const onChange = (e) => {
    setUpdateUserInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {userMessage && <Message variant="danger">{userMessage}</Message>}
        {isError && <Message variant="danger">{message}</Message>}
        {success && (
          <Message variant="success">Your profile has been updated!</Message>
        )}
        {isLoading && <Loader />}
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              name="name"
              defaultValue={user ? name : null}
              placeholder={!user ? 'Enter name' : null}
              onChange={(e) => onChange(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              defaultValue={user ? email : null}
              placeholder={!user ? 'Enter email' : null}
              onChange={(e) => onChange(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder={'Enter password'}
              onChange={(e) => onChange(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder={'Enter password'}
              onChange={(e) => onChange(e)}
            ></Form.Control>
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="my-3 rounded col-12"
          >
            Submit
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        {' '}
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant={'danger'}>{errorOrders}</Message>
        ) : (
          <Table
            striped
            bordered
            hover
            responsive
            className="table-sm"
            style={{ border: 'grey' }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>Paid</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.split('T')[0]}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.split('T')[0]
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.split('T')[0]
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
