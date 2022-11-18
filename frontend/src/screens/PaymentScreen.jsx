import React, { useState, useEffect } from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer.jsx'
import CheckoutSteps from '../components/CheckoutSteps.jsx'
import { savePaymentMethod } from '../redux-features/reducers_ajaxCalls/paymentMethodReducer'

const PaymentScreen = () => {
  const [step] = useState(2)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [radioValue, setRadioValue] = useState('PayPal')

  const radios = [
    { value: 'PayPal' },
    { value: 'Stripe' },
    { value: 'Credit Card' },
  ]

  const shippingAddress = useSelector((state) => state.shipping)

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping')
    }
  })

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(radioValue))
    console.log(radioValue)
    navigate('/placeorder')
  }

  const onChange = (e) => {
    setRadioValue(e.currentTarget.value)
    console.log(e.currentTarget.value)
  }

  return (
    <>
      <CheckoutSteps step={step} />
      <FormContainer>
        <h1>Payment Method</h1>
        <Form onSubmit={onSubmit}>
          <Row>
            <Form.Group>
              <Form.Label as="legend">Select Mehtod</Form.Label>
            </Form.Group>
          </Row>
          <Row>
            <ButtonGroup>
              <Col>
                {radios.map((radio, idx) => (
                  <Form.Check
                    key={idx}
                    id={`radio-${idx}`}
                    label={radio.value}
                    type="radio"
                    className="mx-3"
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => onChange(e)}
                  ></Form.Check>
                ))}
              </Col>
            </ButtonGroup>
          </Row>
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

export default PaymentScreen