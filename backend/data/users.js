import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('admin1234', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: bcrypt.hashSync('admin1234', 10),
  },
  {
    name: 'Jane Doe',
    email: 'janedoe@example.com',
    password: bcrypt.hashSync('admin1234', 10),
  },
  {
    name: 'Otto Jones',
    email: 'ottosjonesjr@gmail.com',
    password: bcrypt.hashSync('admin1234', 10),
    isAdmin: true,
  },
]

export default users
