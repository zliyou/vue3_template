import Axios from 'axios'

const axiosInstance = Axios.create({
  baseURL: '/',
})

axiosInstance.interceptors.request.use((body) => {
  const token = ''
  body.headers['Authorization'] = `Bearer ${token}`
  body.headers['Content-type'] = 'application/json; charset=UTF-8'
  return body
})
axiosInstance.interceptors.response.use((response) => {
  if (response.status === 401) {
    // redirect to login page
  }
  return response
})

export const axios = axiosInstance
