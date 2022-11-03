import React from "react"
import { Link } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap"
import { useParams } from "react-router-dom"
import Rating from "../components/Rating"
import products from "../products"

const ProductScreen = (props) => {
  const params = useParams()
  const product = products.find((p) => p._id === params.id)

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
