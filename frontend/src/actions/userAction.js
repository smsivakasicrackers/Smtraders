import axios from "axios";
import {
  clearError,
  forgotPasswordFail,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  loginFail,
  loginRequest,
  loginSucess,
  logoutFail,
  logoutSuccess,
  registerFail,
  registerRequest,
  registerSuccess,
  resetPasswordFail,
  resetPasswordRequest,
  
  resetPasswordSuccess,
} from "../slices/authslice";

import{
  usersRequest,usersSuccess,usersFail
} from "../slices/userSlice"
const frontendUrl = process.env.REACT_APP_FRONTEND_URL;

export const getUsers =  async (dispatch) => {

  try {
      dispatch(usersRequest())
      const { data }  = await axios.get(`${frontendUrl}/admin/users`,{withCredentials:true});
      dispatch(usersSuccess(data))
  } catch (error) {
      dispatch(usersFail(error.response.data.message))
  }

}

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post(`${frontendUrl}/login`, { email, password },
      {withCredentials:true, 
        headers: {
      "Content-Type": "application/json",
    }},
     );  
    dispatch(loginSucess(data));
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
  }
};

export const clearAuthError = (dispatch) => {
  dispatch(clearError());
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registerRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`${frontendUrl}/register`, userData, config);

    console.log("Response Data:", data);
    dispatch(registerSuccess(data));
  } catch (error) {
    console.error("Error in register action:", error.response?.data || error.message);
    dispatch(
      registerFail(error.response?.data?.message || "Failed to register user")
    );
  }
};
export const loadUser = async (dispatch) => {
    try {
      dispatch(loadUserRequest())
      const { data} = await axios.get(`${frontendUrl}/myprofile`,{withCredentials:true}); 
      dispatch(loadUserSuccess(data));
    } catch (error) {
      dispatch(loadUserFail(error.response?.data?.message || "Failed to load user"));
    }
  };

  export const logout = async (dispatch) => {
    try {
      await axios.get(`${frontendUrl}/logout`,{withCredentials:true});
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(logoutFail(error.response.data.message));
    }
  };

  export const forgotPassword = (formData) => async (dispatch) => {

    try {
        dispatch(forgotPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data} =  await axios.post(`/api/v1/password/forgot`, formData, config);
        dispatch(forgotPasswordSuccess(data))
    } catch (error) {
        dispatch(forgotPasswordFail(error.response.data.message))
    }

}

export const resetPassword = (formData, token) => async (dispatch) => {

    try {
        dispatch(resetPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data} =  await axios.post(`/api/v1/password/reset/${token}`, formData, config);
        dispatch(resetPasswordSuccess(data))
    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message))
    }

}