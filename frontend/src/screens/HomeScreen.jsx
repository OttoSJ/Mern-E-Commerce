import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Meta from '../components/Meta'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import { getProductList } from '../redux-features/reducers_ajaxCalls/productListReducer'

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
  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductList({ keyword, pageNumber }))
  }, [dispatch, keyword, pageNumber, topRatedProducts, user])

  return (
    <>
      <Meta
        title="ProShop Home"
        description="We sell the best products for cheap"
        keywords="electronics, buy electronics, cheap electronics"
      />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
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
          <div className="d-flex justify-content-center">
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            />
          </div>
        </>
      )}
    </>
  )
}

export default HomeScreen
