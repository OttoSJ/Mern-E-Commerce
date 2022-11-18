import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer.jsx'
import { saveShippingAddress } from '../redux-features/reducers_ajaxCalls/shippingReducer.js'
import CheckoutSteps from '../components/CheckoutSteps.jsx'

const ShippingScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [step] = useState(1)
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.auth.user)
  const { address, city, country, postalCode } = cart.shippingAddress

  console.log(user)
  const [formData, setFormData] = useState({
    address,
    city,
    postalCode,
    country,
  })

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('submitted form')
    dispatch(saveShippingAddress(formData))
    navigate('/payment')
  }
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  return (
    <>
      <CheckoutSteps step={step} />
      <FormContainer>
        <h1>Shipping</h1>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="address">
            <Form.Label>
              {' '}
              <span className="required">*</span> Address
            </Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={address}
              placeholder="Enter address"
              required
              onChange={(e) => onChange(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>
              {' '}
              <span className="required">*</span> City
            </Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={city}
              placeholder="Enter city"
              required
              onChange={(e) => onChange(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="postalCode">
            <Form.Label>
              {' '}
              <span className="required">*</span> Zip Code
            </Form.Label>
            <Form.Control
              type="text"
              name="postalCode"
              value={postalCode}
              placeholder="Enter Zip Code"
              required
              onChange={(e) => onChange(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="country">
            <Form.Label>
              {' '}
              <span className="required">*</span> Country
            </Form.Label>
            <Form.Control
              as="select"
              type="state"
              name="country"
              required
              onChange={(e) => onChange(e)}
            >
              <option>-- Select Country --</option>
              <option>US</option>
            </Form.Control>
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="my-3 rounded col-12"
          >
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default ShippingScreen
