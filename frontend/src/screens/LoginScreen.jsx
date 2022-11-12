import React, { useState, useEffect } from 'react'
import { Row, Col, ListGroup, Button, Form, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../redux-features/reducers_ajaxCalls/authReducer.js'
import FormContainer from '../components/FormContainer.jsx'

const LoginScreen = () => {
  const dispatch = useDispatch()
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  })

  const { email, password } = loginInfo

  const submitHandler = (e) => {
    setLoginInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => submitHandler}
          ></Form.Control>
        </Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control></Form.Control>
        <Button type="submit">Submit</Button>
      </Form>
    </FormContainer>
  )
}

export default LoginScreen
