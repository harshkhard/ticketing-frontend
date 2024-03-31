import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthApi } from "../../services/auth";
import { LoginActionPayload, LoginResponse } from "../../models/auth/login";
import { ErrorType } from "../../models/error";
import { DEFAULT_ERROR_MSG } from "../../utils/constants";

type initialStateType = {
  /**
   * Login
   */
  loggedInUserUserName: string;
  loggedInUserName: string;
  loginLoading: boolean;

  /**
   * Sign up
   */
  signupLoading: boolean;
};

const initialState: initialStateType = {
  loggedInUserUserName: "",
  loggedInUserName: "",
  loginLoading: false,
  signupLoading: false,
};

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginActionPayload,
  { rejectValue: ErrorType }
>("authSlice/loginUser", async (payload, { rejectWithValue }) => {
  try {
    const res = await AuthApi.login(payload.userName);
    return res as LoginResponse;
  } catch (e) {
    return rejectWithValue(e as ErrorType);
  }
});

export const AuthSlice = createSlice({
  name: "authSlice",
  reducers: {},
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loginLoading = false;
      alert(action.payload?.message ?? DEFAULT_ERROR_MSG);
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loggedInUserName = action.payload.athlete_name;
      state.loggedInUserUserName = action.payload.athlete_id;
      state.loginLoading = false;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.signupLoading = true;
    });
  },
});
