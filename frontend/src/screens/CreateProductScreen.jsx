import React, { useEffect, useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  createProduct,
  reset,
  getProductList,
} from '../redux-features/reducers_ajaxCalls/productListReducer'

const CreateProductScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)
  const count = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const { user: adminUser } = useSelector((state) => state.auth)

  const { product, isError, isLoading, message } = useSelector(
    (state) => state.products
  )

  const [updateProductInfo, setUpdateProductInfo] = useState({
    brand: '',
    category: '',
    countInStock: '',
    description: '',
    image: '',
    name: '',
    price: '',
    user: adminUser.id,
  })

  useEffect(() => {
    if (!adminUser) {
      navigate('/login')
    }

    if (product.isSuccess) {
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    }
  }, [dispatch, product?.isSuccess, navigate, adminUser, updateProductInfo])

  const handleReset = () => {
    dispatch(reset())
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await dispatch(createProduct(updateProductInfo))
    await dispatch(getProductList())
    navigate('/admin/productlist')
  }

  const onChange = (e) => {
    setUpdateProductInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      <Link
        to="/admin/productlist"
        className="btn btn-light my-3"
        onClick={handleReset}
      >
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <h2>Create Product</h2>
          {isError && <Message variant="danger">{message}</Message>}
          {success && (
            <Message variant="success">The Product has been updated!</Message>
          )}
          {isLoading && <Loader />}
          <Form onSubmit={onSubmit}>
            <Form.Group className="my-4">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                placeholder={'Enter brand'}
                onChange={(e) => onChange(e)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-4">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                placeholder={'Enter category'}
                onChange={(e) => onChange(e)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-4 col-5">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                as="select"
                type="select"
                name="countInStock"
                onChange={(e) => onChange(e)}
              >
                <>
                  <option>--Select Count--</option>
                  {count.map((number) => (
                    <option key={number}>{Number(number)}</option>
                  ))}
                </>
              </Form.Control>
            </Form.Group>
            <Form.Group className="my-4">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder={'Enter description'}
                onChange={(e) => onChange(e)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-4">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                name="image"
                placeholder={'Enter Image Url'}
                onChange={(e) => onChange(e)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-4">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder={'Enter name'}
                onChange={(e) => onChange(e)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-4">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                placeholder={'Enter price'}
                onChange={(e) => onChange(e)}
              ></Form.Control>
            </Form.Group>
            <Button
              onClick={handleReset}
              type="submit"
              variant="primary"
              className="my-3 rounded col-12"
            >
              Create
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default CreateProductScreen
