import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { commonActions } from "./slice";
import { RootState } from "../rootReducer";
import AuthAPI from "../../../api/AuthApi";


const handleLogin =
  (isUserLoggedIn: boolean): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(commonActions.handleLogin({isUserLoggedIn : isUserLoggedIn}));
  };

const getStatus =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    let status = await AuthAPI.getStatus();
    if (status) {
      dispatch(commonActions.getStatus(status));
    } else {
      dispatch(commonActions.getStatus(false));
    }
  };

export { handleLogin, getStatus };
