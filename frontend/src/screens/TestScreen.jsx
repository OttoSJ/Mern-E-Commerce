import React, { useEffect, useState } from 'react'

const TestScreen = () => {
  let user = {
    name: '',
    email: '',
    isAdmin: null,
  }
  const [selectedButton, setSelectedButton] = useState('radio1')

  const isRadioSelected = (value) => {
    return selectedButton === value
  }

  const handleRadioClick = (e) => {
    setSelectedButton(e.currentTarget.name)
    user.isAdmin = e.currentTarget.value
    console.log(user)
    console.log(e.currentTarget.name)
    console.log(e.currentTarget.value)
  }

  console.log(user)

  useEffect(() => {}, [selectedButton, user.name])

  return (
    <div>
      <input
        type="radio"
        value={true}
        name="radio1"
        className="mx-2"
        checked={isRadioSelected('radio1')}
        onChange={handleRadioClick}
      />
      <input
        type="radio"
        value={false}
        name="radio2"
        className="mx-2"
        checked={isRadioSelected('radio2')}
        onChange={handleRadioClick}
      />
      <input
        type="radio"
        value={true}
        className="mx-2"
        checked={isRadioSelected('radio3')}
        onChange={handleRadioClick}
      />
      <input
        type="radio"
        value={false}
        className="mx-2"
        checked={isRadioSelected('radio4')}
        onChange={handleRadioClick}
      />
    </div>
  )
}

export default TestScreen
