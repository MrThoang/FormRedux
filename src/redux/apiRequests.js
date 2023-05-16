import { fetchListUser, createUser, editUserById, deleteUser } from "../services/auth";
import { getListUserSuccess, getListUserPending, getListUserError } from "./slice/user"


export const getListUser = async (dispatch) => {
  getListUserPending()
  try {
    const res = await fetchListUser()
    dispatch(getListUserSuccess(res))
  } catch (error) {
    getListUserError()
    console.log(error);
  }
} 

export const createUserApi = async (payload, onSuccess) => {
  try {
    const res = await createUser(payload)
    if(res.status === 200) {
      onSuccess()
    }
  } catch (error) { 
    console.log(error);
  }
} 

export const editUserApi = async (userId, payload, successCb) => {
  try {
    const res = await editUserById(userId, payload)
    if (res.status === 200) {
      successCb?.();
    }
  } catch (error) { 
    console.log(error);
  }
} 

export const deleteUserApi = async (userId, onSuccess) => {
  try {
    const res = await deleteUser(userId)
    if(res.status === 200) {
      onSuccess?.()
    }
  } catch (error) { 
    console.log(error);
  }
} 