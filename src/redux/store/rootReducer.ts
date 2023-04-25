import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { commonSlice } from './common/slice'

export const rootRecucer = combineReducers({
  common: commonSlice.reducer,
})
export const store = configureStore({
  reducer: rootRecucer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch