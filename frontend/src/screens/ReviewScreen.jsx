import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  Row,
  Col,
  Image,
  ListGroup,
  ButtonGroup,
  Form,
  Button,
} from 'react-bootstrap'
import { getProductById } from '../redux-features/reducers_ajaxCalls/singleProductReducer'
import { createReview } from '../redux-features/reducers_ajaxCalls/reviewReducer'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ReviewScreen = () => {
  const [review, setReview] = useState({
    comment: '',
    rating: 1,
  })

  const [radioValue, setRadioValue] = useState('')

  const radios = [
    { value: '1' },
    { value: '2' },
    { value: '3' },
    { value: '4' },
    { value: '5' },
  ]

  let { isError: reviewError, message: reviewMessage } = useSelector(
    (state) => state.reviews
  )
  let { product, isLoading, isError, message } = useSelector(
    (state) => state.productDetails
  )
  product = product.data

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const params = useParams()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createReview({ review, productId: params.productId }))

    setTimeout(() => {
      navigate(`/orderdetails/${params.orderId}`)
    }, 2000)
  }

  const onChange = (e) => {
    setReview((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
    setRadioValue(e.target.value)
  }

  useEffect(() => {
    dispatch(getProductById(params.productId))
  }, [dispatch, params.productId])

  return (
    <>
      <Link
        className="btn btn-light my-3 col-2"
        to={`/orderdetails/${params.orderId}`}
      >
        Go Back
      </Link>

      {reviewError && <Message variant="danger">{reviewMessage}</Message>}

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{message}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product?.image} alt={product?.name} fluid />
          </Col>
          <Col className="margin" md={5}>
            <h3>Leave a review</h3>
            <Form>
              <Form.Group sm={5}>
                <Form.Label>Comments</Form.Label>
                <Form.Control
                  type="text"
                  name="comment"
                  placeholder="Enter Comments"
                  style={{ padding: '20px' }}
                  onChange={(e) => onChange(e)}
                ></Form.Control>
              </Form.Group>
              <Row>
                <Form.Label className="my-3">Rating</Form.Label>
                <ButtonGroup>
                  {radios.map((radio, idx) => (
                    <Form.Check
                      key={idx}
                      label={radio.value}
                      type="radio"
                      name="rating"
                      className="mx-2"
                      value={Number(radio.value)}
                      checked={radioValue === radio.value}
                      onChange={(e) => onChange(e)}
                    ></Form.Check>
                  ))}
                </ButtonGroup>
                <div className="d-flex justify-content-center">
                  <Button onClick={onSubmit} className="button-margin col-8">
                    Submit Review
                  </Button>
                </div>
              </Row>
            </Form>
          </Col>
          <Row>
            <Col md={12}>
              <ListGroup.Item>
                <h3>{product?.name}</h3>
              </ListGroup.Item>
              <ListGroup variant="flush">
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
            </Col>
          </Row>
        </Row>
      )}
    </>
  )
}

export default ReviewScreen
