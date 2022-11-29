import React, { useEffect } from 'react'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import Loader from '../components/Loader'
import {
  getProductList,
  deleteProduct,
} from '../redux-features/reducers_ajaxCalls/productListReducer'

const ProductListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let pageNumber = useParams().pageNumber || 1
  const products = useSelector((state) => state.products)
  const {
    products: { data: allProducts },
    products: { page },
    products: { pages },
    isLoading,
    isError,
    isSuccess,
    message,
  } = products
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/login')
    } else {
      dispatch(getProductList({ keyword: '', pageNumber }))
    }
  }, [dispatch, navigate, user?.isAdmin, isSuccess, pageNumber])

  const deleteHandler = async (productId) => {
    if (window.confirm('Are you sure')) {
      await dispatch(deleteProduct(productId))

      await dispatch(getProductList())
    }
  }

  const createProductHandler = () => {
    navigate('/admin/products/create')
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
        <Message variant="danger">{message}</Message>
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
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
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
          <Paginate pages={pages} page={page} isAdmin={user?.isAdmin} />
        </>
      )}
    </>
  )
}

export default ProductListScreen
