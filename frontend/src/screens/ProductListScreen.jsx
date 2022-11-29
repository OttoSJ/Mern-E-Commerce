import React, { useEffect } from 'react'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getProductList,
  deleteProduct,
} from '../redux-features/reducers_ajaxCalls/productListReducer'

const ProductListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const products = useSelector((state) => state.products)
  const {
    products: { data: allProducts },
    isLoading,
    isError,
    isSuccess,
  } = products
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/login')
    }

    dispatch(getProductList())
  }, [dispatch, navigate, user?.isAdmin, isSuccess])

  const deleteHandler = async (productId) => {
    if (window.confirm('Are you sure')) {
      await dispatch(deleteProduct(productId))

      await dispatch(getProductList())
    }
  }
  const handleReset = () => {
    //
  }

  const createProductHandler = () => {
    navigate('/admin/products/create')
    //
  }

  return (
    <>
      <Row className="align-items-center ">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          Error has occurred retrieving the products
        </Message>
      ) : (
        <>
          <Table striped bordered responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>PRODUCT NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allProducts?.map((product) => (
                <tr key={product._id}>
                  <td>{product?._id}</td>
                  <td>{product?.name}</td>
                  <td>${product?.price}</td>
                  <td>{product?.category}</td>
                  <td>{product?.brand}</td>
                  <td>
                    <LinkContainer
                      onClick={handleReset}
                      to={`/admin/product/${product._id}/edit`}
                    >
                      <Button variant="light" className="btn-sm m-1">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm m-1"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default ProductListScreen
