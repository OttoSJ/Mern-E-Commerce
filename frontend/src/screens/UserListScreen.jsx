import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getAllUsers,
  deleteUser,
  reset,
} from '../redux-features/reducers_ajaxCalls/userReducer.js'

const UserListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const {
    isLoading,
    isSuccess,
    isError,
    allUsers: users,
  } = useSelector((state) => state.userList)

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/login')
    } else {
      dispatch(getAllUsers())
    }
  }, [dispatch, navigate, user?.isAdmin, isSuccess])

  const deleteHandler = (userId) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(userId))
    }
  }
  const handleReset = () => {
    dispatch(reset())
  }

  return (
    <>
      <h1>Users</h1>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{isError}</Message>
      ) : (
        <Table striped bordered responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer
                      onClick={handleReset}
                      to={`/user/${user._id}/edit`}
                    >
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i> Edit
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm mx-2"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className="fas fa-trash"></i> Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
