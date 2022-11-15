import axios from 'axios'
const base_URL = '/api/users/'

const loginUser = async (userLoginInfo) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const {
    data: { data, token },
  } = await axios.post(base_URL + 'login', userLoginInfo, config)
  const user = {
    id: data._id,
    name: data.name,
    email: data.email,
    isAdmin: data.isAdmin,
    token,
  }

  if (data) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  return user
}

const logoutUser = async () => {
  localStorage.removeItem('user')
}

const register = async (userInfo) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const {
    data: { data, token },
  } = await axios.post(base_URL, userInfo, config)
  const newUser = {
    id: data._id,
    name: data.name,
    email: data.email,
    isAdmin: data.isAdmin,
    token,
  }
  if (data) {
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  return newUser
}

const updateUser = async (userInfo) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }

  const {
    data: { data },
  } = await axios.put(base_URL, userInfo, config)

  const updatedUser = {
    id: data._id,
    name: data.name,
    email: data.email,
    isAdmin: data.isAdmin,
    token: userInfo.token,
    success: false,
  }

  if (data) {
    updatedUser.success = true
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  return updatedUser
}

const authAPI = {
  loginUser,
  logoutUser,
  register,
  updateUser,
}

export default authAPI
