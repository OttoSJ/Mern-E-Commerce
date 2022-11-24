import axios from 'axios'
const base_URL = '/api/users/'

const getUserList = async () => {
  const token = JSON.parse(localStorage.getItem('user'))?.token
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  const {
    data: { data },
  } = await axios.get(base_URL, config)

  return data
}

const getUserById = async (userId) => {
  const token = JSON.parse(localStorage.getItem('user'))?.token
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  const {
    data: { data },
  } = await axios.get(`${base_URL}/getuser/${userId}`, config)

  return data
}

const updateUser = async (userInfo) => {
  const token = JSON.parse(localStorage.getItem('user'))?.token
  const { userInfo: userData, userId } = userInfo
  console.log(userId)

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const {
    data: { data },
  } = await axios.put(`${base_URL}admin/${userId}`, userData, config)

  data['isSuccess'] = true

  return data
}

const deleteUser = async (userId) => {
  const token = JSON.parse(localStorage.getItem('user'))?.token
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  const {
    data: { data },
  } = await axios.delete(`${base_URL}/${userId}`, config)

  return data
}

const usersAPI = { getUserList, deleteUser, updateUser, getUserById }

export default usersAPI
