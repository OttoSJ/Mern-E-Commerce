import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getProductById,
  updateProduct,
  deleteProduct,
  reset,
} from '../redux-features/reducers_ajaxCalls/productListReducer'

const EditProductScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const productId = useParams().productId
  const [success, setSuccess] = useState(false)
  const [uploading, setUploading] = useState(false)
  const count = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const { user: adminUser } = useSelector((state) => state.auth)

  const { product, isError, isLoading, message } = useSelector(
    (state) => state.products
  )
  const [image, setImage] = useState(null)

  const [updateProductInfo, setUpdateProductInfo] = useState({
    brand: product?.data?.brand,
    category: product?.data?.category,
    countInStock: product?.data?.countInStock,
    description: product?.data?.description,
    image: image,
    name: product?.data?.name,
    price: product?.data?.price,
  })

  useEffect(() => {
    if (!adminUser) {
      navigate('/login')
    }
    dispatch(getProductById(productId))

    if (product.isSuccess) {
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    }
  }, [
    dispatch,
    productId,
    product?.isSuccess,
    navigate,
    adminUser,
    updateProductInfo,
  ])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUpdateProductInfo((prevState) => ({
        ...prevState,
        image: data,
      }))

      setUploading(false)
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }
  const handleDelete = () => {
    dispatch(deleteProduct(productId))
    dispatch(reset())
    navigate('/admin/productlist')
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(updateProduct({ updateProductInfo, productId }))
  }

  const onChange = (e) => {
    setUpdateProductInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
    console.log(updateProductInfo)
  }

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <h2>Edit Product</h2>
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
                defaultValue={product?.success ? product.data.brand : null}
                placeholder={!product?.success ? 'Enter brand' : product?.brand}
                onChange={(e) => onChange(e)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-4">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                defaultValue={product?.success ? product?.data?.category : null}
                placeholder={
                  !product?.success ? 'Enter category' : product?.category
                }
                onChange={(e) => onChange(e)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-4 col-5">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                as="select"
                type="select"
                name="countInStock"
                defaultValue={
                  product?.success ? product?.data?.countInStock : null
                }
                onChange={(e) => onChange(e)}
              >
                <>
                  {product?.data?.countInStock > 0 ? (
                    <option>{product?.data?.countInStock}</option>
                  ) : (
                    <option>--Out Of Stock--</option>
                  )}
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
                defaultValue={
                  product?.success ? product?.data?.description : null
                }
                placeholder={
                  !product?.success ? 'Enter description' : product?.description
                }
                onChange={(e) => onChange(e)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-4">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                name="image"
                defaultValue={image ? image : product?.data?.image}
                placeholder={
                  !product?.success ? 'Enter Image Url' : product?.image
                }
                onChange={(e) => onChange(e)}
              ></Form.Control>
              <Form.Control
                id="image-file"
                type="file"
                name="image"
                label="Choose File"
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group className="my-4">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                defaultValue={product?.success ? product?.data?.name : null}
                placeholder={!product?.success ? 'Enter name' : product?.name}
                onChange={(e) => onChange(e)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-4">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                defaultValue={product?.success ? product?.data?.price : null}
                placeholder={!product?.success ? 'Enter price' : product?.price}
                onChange={(e) => onChange(e)}
              ></Form.Control>
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

export default EditProductScreen
