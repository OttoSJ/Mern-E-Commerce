import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import {
  getProductList,
  getTopProducts,
} from '../redux-features/reducers_ajaxCalls/productListReducer'

const HomeScreen = () => {
  const keyword = useParams().keyword
  let pageNumber = useParams().pageNumber || 1
  const {
    products: { data },
    products: { page },
    products: { pages },
    topProducts: { data: topRatedProducts },
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.products)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductList({ keyword, pageNumber }))
    dispatch(getTopProducts())
  }, [dispatch, keyword, pageNumber.topRatedProducts])

  return (
    <>
      <h1>Latest Poducts</h1>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{message}</Message>
      ) : (
        <>
          <Row>
            {data &&
              data.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
