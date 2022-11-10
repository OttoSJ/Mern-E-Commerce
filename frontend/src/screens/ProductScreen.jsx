import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap"
import { getProductById } from "../redux-features/reducers_ajaxCalls/singleProductReducer"
import Rating from "../components/Rating"
import Loader from "../components/Loader"
import Message from "../components/Message"

const ProductScreen = () => {
  let { product, isLoading, isError, message } = useSelector(
    (state) => state.productDetails
  )
  product = product.data

  const dispatch = useDispatch()

  const params = useParams()

  useEffect(() => {
    dispatch(getProductById(params.productId))
  }, [dispatch, params.productId])

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{message}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product?.image} alt={product?.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product?.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product?.rating}
                  text={`${product?.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product?.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>{" "}
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product?.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Status</Col>
                    <Col>
                      {product?.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product?.countInStock === 0}
                  >
                    {product?.countInStock === 0
                      ? "Out Of Stock"
                      : "Add To Cart"}
                  </Button>
                </ListGroup>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
