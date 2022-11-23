import React, { useEffect, useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  reset,
  deleteUser,
  updateUser,
  getUserById,
} from '../redux-features/reducers_ajaxCalls/userReducer.js'

const EditUsersScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userId = useParams().userId
  const [success, setSuccess] = useState(false)
  const { user: adminUser } = useSelector((state) => state.auth)
  const { user, isError, message, isLoading } = useSelector(
    (state) => state.userList
  )
  const [updateUserInfo, setUpdateUserInfo] = useState({
    name: user?.name,
    email: user?.email,
    isAdmin: user?.isAdmin,
  })

  console.log(userId)
  useEffect(() => {
    if (!adminUser) {
      navigate('/login')
    }
    dispatch(getUserById(userId))
  }, [dispatch, userId, adminUser.isAdmin, navigate, adminUser])

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(updateUser({ userInfo: updateUserInfo, userid: userId }))

    if (user.isSuccess) {
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

  const handleDelete = (e) => {
    console.log('clicked')
    dispatch(deleteUser(userId))
    dispatch(reset())
    navigate('/admin/userlist')
  }

  return (
    <Row>
      <Col md={6}>
        <h2>User Profile</h2>
        {/* {userMessage && <Message variant="danger">{userMessage}</Message>} */}
        {isError && <Message variant="danger">{message}</Message>}
        {success && (
          <Message variant="success">Your profile has been updated!</Message>
        )}
        {isLoading && <Loader />}
        <Form onSubmit={onSubmit}>
          <Form.Group className="my-4" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              name="name"
              defaultValue={user ? user.name : null}
              placeholder={!user ? 'Enter name' : null}
              onChange={(e) => onChange(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-4" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              defaultValue={user ? user.email : null}
              placeholder={!user ? 'Enter email' : null}
              onChange={(e) => onChange(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-4" controlId="isAdmin">
            <Form.Label>Admin</Form.Label>
            <Form.Control as="select" name="isAdmin" onChange={onChange}>
              <option>--Select--</option>
              <option value={true}>True</option>
              <option value={false}>False</option>
            </Form.Control>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="my-3 rounded col-12"
          >
            Update
          </Button>
          <Button
            onClick={handleDelete}
            variant="danger"
            className="my-3 rounded col-12"
          >
            Delete
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default EditUsersScreen
