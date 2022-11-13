import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../redux-features/reducers_ajaxCalls/authReducer.js'
import FormContainer from '../components/FormContainer.jsx'
import { reset } from '../redux-features/reducers_ajaxCalls/authReducer'

const LoginScreen = () => {
  const dispatch = useDispatch()
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  })
  const { isLoading, isError, user, message } = useSelector(
    (state) => state.auth
  )

  const location = useLocation()
  const navigate = useNavigate()

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (user) {
      navigate(redirect)
    } else {
      dispatch(reset())
    }
    console.log(user)
  }, [navigate, user, redirect])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(login(loginInfo))
    navigate('/')
  }
  const onChange = (e) => {
    setLoginInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      <h1>Sign In</h1>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{message}</Message>
      ) : (
        <FormContainer>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={(e) => onChange(e)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={(e) => onChange(e)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="my-3 rounded">
              Sign In
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
              New Customer ?
              <Link
                className="mx-2"
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
              >
                Register
              </Link>
            </Col>
          </Row>
        </FormContainer>
      )}
    </>
  )
}

export default LoginScreen
