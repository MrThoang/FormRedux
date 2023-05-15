import { fetchListUser, fetchUserById } from "../services/auth";
import { getListUserSuccess, getUserBuyIdSuccess } from "./slice/user"


export const getListUser = async (dispatch) => {
  try {
    const res = await fetchListUser()
    dispatch(getListUserSuccess(res))

  } catch (error) { 
    console.log(error);
  }
} 

export const getUserBuyId = async (userId, dispatch) => {
  try {
    const res = await fetchUserById(userId)
    dispatch(getUserBuyIdSuccess(res))

  } catch (error) { 
    console.log(error);
  }
} 