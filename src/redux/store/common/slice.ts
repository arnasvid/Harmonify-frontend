import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isUserLoggedIn: undefined,
}

export const commonSlice = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {
    setIsUserLoggedIn: (state, action) => {
        state.isUserLoggedIn = action.payload
    },
    handleLogin : (state, action) => {
        state.isUserLoggedIn = action.payload
    },
    getStatus : (state, action) => {
      state.isUserLoggedIn = action.payload
    },
  },
})




export const commonActions = commonSlice.actions