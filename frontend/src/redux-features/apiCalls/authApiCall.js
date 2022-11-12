import axios from 'axios'
const base_URL = '/api/users/'

const loginUser = async (userInfo) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const {
    data: { data, token },
  } = await axios.post(base_URL + 'login', userInfo, config)
  const user = {
    name: data.name,
    email: data.email,
    isAdmin: data.isAdmin,
    token,
  }

  console.log(user)

  //   if (data) {
  //     localStorage.setItem('user', JSON.stringify(data))
  //   }
  return
}

// loginUser({ email: 'ottojones@gmail.com', password: 'admin1234' })

const logoutUser = async () => {
  return console.log('Logged user is')
}

const authAPI = {
  loginUser,
  logoutUser,
}

export default authAPI
