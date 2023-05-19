import { createSlice } from '@reduxjs/toolkit'
import CommonState from './commonState'

const initialState = {
  common : {
    isUserLoggedIn: false,
    isUserLoggedInWithSpotify: undefined,
    isUserAdmin: undefined,
  }
}

export const commonSlice = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {
    handleLogin : (state, action) => {
        state.common = action.payload
    },
    getStatus : (state, action) => {
      state.common = action.payload
    },
  },
})




export const commonActions = commonSlice.actions