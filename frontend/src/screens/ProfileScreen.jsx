import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer.jsx'
import { updateUser } from '../redux-features/reducers_ajaxCalls/authReducer.js'

const ProfileScreen = () => {
  const dispatch = useDispatch()

  const [userMessage, setUserMessage] = useState(null)
  const { isLoading, isError, user, message } = useSelector(
    (state) => state.auth
  )

  const [updateUserInfo, setUpdateUserInfo] = useState({
    name: user.name,
    email: user.email,
    password: '',
    confirmPassword: '',
    token: user.token,
  })
  const { name, email, password, confirmPassword } = updateUserInfo

  const location = useLocation()
  const navigate = useNavigate()

  const redirect = location.search ? location.search.split('=')[1] : '/'

  //   useEffect(() => {
  //     if (user) {
  //       navigate(redirect)
  //     }
  //   }, [navigate, user, redirect])

  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      return setUserMessage('Passwords must match')
    }
    dispatch(updateUser(updateUserInfo))

    if (user) {
      navigate('/')
    }
  }
  const onChange = (e) => {
    setUpdateUserInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  console.log(updateUserInfo)
  return (
    <>
      <h1>User Profile</h1>
      {userMessage && <Message variant="danger">{userMessage}</Message>}
      {isError && <Message variant="danger">{message}</Message>}
      {isLoading && <Loader />}
      <FormContainer>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              name="name"
              defaultValue={user ? user.name : null}
              placeholder={!user ? 'Enter name' : null}
              onChange={(e) => onChange(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              defaultValue={user ? user.email : null}
              placeholder={!user ? 'Enter email' : null}
              onChange={(e) => onChange(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              defaultValue={user ? user.password : null}
              placeholder={!user ? 'Enter password' : null}
              onChange={(e) => onChange(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              defaultValue={user ? user.password : null}
              placeholder={!user ? 'Enter password' : null}
              onChange={(e) => onChange(e)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="my-3 rounded">
            Submit
          </Button>
        </Form>
        {/* <Row className="py-3">
          <Col>
            Have an Account ?
            <Link
              className="mx-2"
              to={redirect ? `/login?redirect=${redirect}` : '/login'}
            >
              Login
            </Link>
          </Col>
        </Row> */}
      </FormContainer>
    </>
  )
}

export default ProfileScreen
