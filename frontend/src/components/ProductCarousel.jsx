import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getTopProducts } from '../redux-features/reducers_ajaxCalls/productListReducer'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const { topProducts, isError, isLoading, message } = useSelector(
    (state) => state.products
  )

  useEffect(() => {
    dispatch(getTopProducts())
  }, [])
  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message variant="danger">{message} </Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {topProducts.data?.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>{product.name}</h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
