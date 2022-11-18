import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps.jsx'
import FormContainer from '../components/FormContainer.jsx'

const PlaceOrderScreen = () => {
  const [step] = useState(3)
  const cart = useSelector((state) => state.cart)
  console.log(cart)
  return (
    <>
      <CheckoutSteps step={step} />
      <FormContainer>
        <h1>Place Order</h1>
      </FormContainer>
    </>
  )
}

export default PlaceOrderScreen
