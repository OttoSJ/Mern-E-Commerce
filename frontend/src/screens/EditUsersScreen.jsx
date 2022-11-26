import React, { useEffect, useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, Link } from 'react-router-dom'
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
  let [updateUserInfo, setUpdateUserInfo] = useState({
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  })

  let adminStatus = user.isAdmin

  adminStatus = adminStatus ? 'isAdminTrue' : 'isAdminFalse'
  const [selectedButton, setSelectedButton] = useState(adminStatus)

  useEffect(() => {
    if (!adminUser) {
      navigate('/login')
    }
    setSelectedButton(adminStatus)
    dispatch(getUserById(userId))

    if (user.isSuccess) {
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    }
  }, [
    dispatch,
    userId,
    adminUser?.isAdmin,
    navigate,
    adminUser,
    user._id,
    adminStatus,
    user.isSuccess,
  ])

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(updateUser({ userInfo: updateUserInfo, userId: userId }))
  }

  const onChange = (e) => {
    setUpdateUserInfo((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
    setSelectedButton(e.currentTarget.name)
  }

  const handleDelete = () => {
    dispatch(deleteUser(userId))
    dispatch(reset())
    navigate('/admin/userlist')
  }

  const handleReset = () => {
    dispatch(reset())
  }

  return (
    <>
      <Link
        to="/admin/userlist"
        className="btn btn-light my-3"
        onClick={handleReset}
      >
        Go Back{' '}
      </Link>

      <Row>
        <Col md={6}>
          <h2>Edit User Profile</h2>

          {isError && <Message variant="danger">{message}</Message>}
          {success && (
            <Message variant="success">Your profile has been updated!</Message>
          )}
          {isLoading && <Loader />}
          <Form onSubmit={onSubmit}>
            <Form.Group className="my-4">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                id="name"
                defaultValue={user ? user?.name : null}
                placeholder={!user ? 'Enter name' : null}
                onChange={(e) => onChange(e)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-4">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                id="email"
                defaultValue={user ? user?.email : null}
                placeholder={!user ? 'Enter email' : null}
                onChange={(e) => onChange(e)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-4">
              <Form.Label>Admin</Form.Label>

              <Form.Check
                label={'True'}
                type="radio"
                id="isAdmin"
                name="isAdminTrue"
                value={true}
                checked={selectedButton === 'isAdminTrue'}
                onChange={onChange}
              ></Form.Check>
              <Form.Check
                label={'False'}
                type="radio"
                id="isAdmin"
                name="isAdminFalse"
                value={false}
                checked={selectedButton === 'isAdminFalse'}
                onChange={onChange}
              ></Form.Check>
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
    </>
  )
}

export default EditUsersScreen
