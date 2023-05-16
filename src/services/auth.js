import { ApiClient } from "../config/api";

const createUser = (payload) => ApiClient.post('/user', payload)
const fetchListUser = () => ApiClient.get('/user')
const fetchUserById = (userId) => ApiClient.get(`/user/${userId}`)
const editUserById = (userId, payload) => ApiClient.put(`/user/${userId}`, payload)
const deleteUser = (userId) => ApiClient.delete(`/user/${userId}`)

export {
  createUser,
  fetchListUser,
  fetchUserById,
  editUserById,
  deleteUser
}