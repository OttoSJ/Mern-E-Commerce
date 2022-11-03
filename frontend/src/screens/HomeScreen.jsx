import React, { useState, useEffect } from "react"
import axios from "axios"
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"
// import products from "../products"

const HomeScreen = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/products")

      setProducts(data)
    }

    fetchData()
  }, [])

  return (
    <>
      {" "}
      <h1>Latest Poducts</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
