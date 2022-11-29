import axios from 'axios'

const createReview = async (reviewInfo) => {
  const token = JSON.parse(localStorage.getItem('user')).token
  const { review, productId } = reviewInfo

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const payload = {
    comment: review.comment,
    rating: review.rating,
  }

  const {
    data: { data },
  } = await axios.post(`/api/products/${productId}/reviews`, payload, config)

  return data
}
const reviewAPI = { createReview }

export default reviewAPI
