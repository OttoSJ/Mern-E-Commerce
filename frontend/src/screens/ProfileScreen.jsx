import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { updateUser } from '../redux-features/reducers_ajaxCalls/authReducer.js'

const ProfileScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)

  const [userMessage, setUserMessage] = useState(null)
  const { isLoading, isError, user, message } = useSelector(
    (state) => state.auth
  )

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
  }, [navigate, user])

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
      <Col md={4}>
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
          <Button type="submit" variant="primary" className="my-3 rounded">
            Submit
          </Button>
        </Form>
      </Col>
      <Col md={7} className="mx-4">
        {' '}
        <h2>My Orders</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen
