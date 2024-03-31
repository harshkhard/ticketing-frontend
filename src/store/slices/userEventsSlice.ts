import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetUserEventsActionPayload,
  UserEvent,
  UserEventsResponse,
} from "../../models/userEvents/userEventsResponse";
import { ErrorType } from "../../models/error";
import { toast } from "react-toastify";
import { DEFAULT_ERROR_MSG } from "../../utils/constants";
import { UserEventApi } from "../../services/events";
import { RootState } from "..";

type initialStateType = {
  userRegisteredEventsLoading: boolean;
  userRegisteredEvents: UserEvent[];
  userUnregisteredEventsLoading: boolean;
  userUnregisteredEvents: UserEvent[];
};

const initialState: initialStateType = {
  userRegisteredEventsLoading: false,
  userRegisteredEvents: [],
  userUnregisteredEventsLoading: false,
  userUnregisteredEvents: [],
};

export const getUserRegisteredEvents = createAsyncThunk<
  UserEventsResponse,
  GetUserEventsActionPayload,
  { rejectValue: ErrorType }
>(
  "userEventsSlice/getUserRegisteredEvents",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      return UserEventApi.getAllRegisteredEvents(state.auth.loggedInUserId!);
    } catch (e) {
      const typedRes = e as ErrorType;
      toast.error(typedRes?.message ?? DEFAULT_ERROR_MSG);
      return rejectWithValue(typedRes);
    }
  }
);

export const getUserUnRegisteredEvents = createAsyncThunk<
  UserEventsResponse,
  GetUserEventsActionPayload,
  { rejectValue: ErrorType }
>(
  "userEventsSlice/getUserUnRegisteredEvents",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      return UserEventApi.getAllUnregisteredEvents(state.auth.loggedInUserId!);
    } catch (e) {
      const typedRes = e as ErrorType;
      toast.error(typedRes?.message ?? DEFAULT_ERROR_MSG);
      return rejectWithValue(typedRes);
    }
  }
);

export const UserEventSlice = createSlice({
  name: "userEventsSlice",
  reducers: {},
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getUserRegisteredEvents.pending, (state, action) => {
      state.userRegisteredEventsLoading = true;
    });
    builder.addCase(getUserRegisteredEvents.fulfilled, (state, action) => {
      state.userRegisteredEventsLoading = false;
      state.userRegisteredEvents = action.payload.events;
    });
    builder.addCase(getUserRegisteredEvents.rejected, (state, action) => {
      state.userRegisteredEventsLoading = false;
    });

    builder.addCase(getUserUnRegisteredEvents.pending, (state, action) => {
      state.userUnregisteredEventsLoading = true;
    });
    builder.addCase(getUserUnRegisteredEvents.fulfilled, (state, action) => {
      state.userUnregisteredEventsLoading = false;
      state.userUnregisteredEvents = action.payload.events;
    });
    builder.addCase(getUserUnRegisteredEvents.rejected, (state, action) => {
      state.userUnregisteredEventsLoading = false;
    });
  },
});
