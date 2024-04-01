import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthApi } from "../../services/auth";
import {
  LoginActionPayload,
  LoginResponse,
  SignupAcionPayload,
  SignupResponse,
} from "../../models/auth/login";
import { ErrorType } from "../../models/error";
import { DEFAULT_ERROR_MSG } from "../../utils/constants";
import { toast } from "react-toastify";

type initialStateType = {
  /**
   * Login
   */
  loggedInUserUserName: string;
  loggedInUserName: string;
  loggedInUserId: number | null;
  loginLoading: boolean;

  /**
   * Sign up
   */
  signupLoading: boolean;
};

const initialState: initialStateType = {
  loggedInUserUserName: "",
  loggedInUserName: "",
  loggedInUserId: null,
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
    const typedErr = e as ErrorType;
    toast.error(typedErr?.message);
    return rejectWithValue(typedErr);
  }
});

export const createUser = createAsyncThunk<
  SignupResponse,
  SignupAcionPayload,
  { rejectValue: ErrorType }
>("authSlice/signupUser", async (payload, { rejectWithValue }) => {
  try {
    const res = await AuthApi.signup(payload.userName, payload.name);
    return res as SignupResponse;
  } catch (e) {
    const typedErr = e as ErrorType;
    toast.error(typedErr?.message);
    return rejectWithValue(typedErr);
  }
});

export const AuthSlice = createSlice({
  name: "authSlice",
  reducers: {},
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loginLoading = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loggedInUserName = action.payload.athlete_name;
      state.loggedInUserUserName = action.payload.athlete_id;
      state.loggedInUserId = action.payload.id;
      state.loginLoading = false;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.signupLoading = false;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loggedInUserName = action.payload.athlete_name;
      state.loggedInUserUserName = action.payload.athlete_id;
      state.loggedInUserId = action.payload.id;
      state.signupLoading = false;
    });
    builder.addCase(createUser.pending, (state) => {
      state.signupLoading = true;
    });
  },
});
