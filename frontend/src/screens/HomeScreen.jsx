import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getProductList } from '../redux-features/reducers_ajaxCalls/productListReducer'

const HomeScreen = () => {
  const {
    products: { data },
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.products)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductList())
  }, [dispatch])

  return (
    <>
      <h1>Latest Poducts</h1>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{message}</Message>
      ) : (
        <Row>
          {data &&
            data.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
