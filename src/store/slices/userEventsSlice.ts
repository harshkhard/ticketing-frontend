import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetUserEventsActionPayload,
  RegisterEventForUserActionPayload,
  UnRegisterEventForUserActionPayload,
  UserEvent,
  UserEventsResponse,
} from "../../models/userEvents/userEventsResponse";
import { ErrorType } from "../../models/error";
import { toast } from "react-toastify";
import { DEFAULT_ERROR_MSG } from "../../utils/constants";
import { UserEventApi } from "../../services/events";
import { RootState } from "..";

export type Bounds = {
  startX: number;
  endX: number;
  startY: number;
  endY: number;
};

type initialStateType = {
  userRegisteredEventsLoading: boolean;
  userRegisteredEvents: UserEvent[];
  userUnregisteredEventsLoading: boolean;
  userUnregisteredEvents: UserEvent[];
  /**
   * ui bonuds
   */
  registeredEventsBounds: Bounds | null;
  registeredListActive: boolean;
  unRegisteredEventsBounds: Bounds | null;
  unRegisteredListActive: boolean;
};

const initialState: initialStateType = {
  userRegisteredEventsLoading: false,
  userRegisteredEvents: [],
  userUnregisteredEventsLoading: false,
  userUnregisteredEvents: [],
  registeredEventsBounds: null,
  registeredListActive: false,
  unRegisteredEventsBounds: null,
  unRegisteredListActive: false,
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

export const registerUserForEvent = createAsyncThunk<
  undefined,
  RegisterEventForUserActionPayload,
  { rejectValue: ErrorType }
>(
  "userEventsSlice/registerEventForUser",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState() as RootState;
      await UserEventApi.registerEvent(
        state.auth.loggedInUserId!,
        state.event.userUnregisteredEvents[payload.eventIndex]?.id
      );
      dispatch(getUserRegisteredEvents({}));
      dispatch(getUserUnRegisteredEvents({}));
    } catch (e) {
      const typedRes = e as ErrorType;
      toast.error(typedRes?.message ?? DEFAULT_ERROR_MSG);
      return rejectWithValue(typedRes);
    }
  }
);

export const unRegisterEventForUser = createAsyncThunk<
  undefined,
  UnRegisterEventForUserActionPayload,
  { rejectValue: ErrorType }
>(
  "userEventsSlice/unRegisterEventForUser",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState() as RootState;
      await UserEventApi.unRegisterEvent(
        state.auth.loggedInUserId!,
        state.event.userRegisteredEvents[payload.eventIndex]?.id
      );
      dispatch(getUserRegisteredEvents({}));
      dispatch(getUserUnRegisteredEvents({}));
    } catch (e) {
      const typedRes = e as ErrorType;
      toast.error(typedRes?.message ?? DEFAULT_ERROR_MSG);
      return rejectWithValue(typedRes);
    }
  }
);

export const UserEventSlice = createSlice({
  name: "userEventsSlice",
  reducers: {
    setReigsteredEventsBounds(state, action: { payload: Bounds }) {
      state.registeredEventsBounds = action.payload;
    },
    setUnRegisteredEventBounds(state, action: { payload: Bounds }) {
      state.unRegisteredEventsBounds = action.payload;
    },
    setRegisteredListActiveState(state, action: { payload: boolean }) {
      state.registeredListActive = action.payload;
    },
    setUnRegisteteredListActiveState(state, action: { payload: boolean }) {
      state.unRegisteredListActive = action.payload;
    },
  },
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

    builder.addCase(registerUserForEvent.pending, (state, action) => {
      state.userUnregisteredEventsLoading = true;
      state.userRegisteredEventsLoading = true;
    });

    builder.addCase(registerUserForEvent.fulfilled, (state, action) => {});
    builder.addCase(registerUserForEvent.rejected, (state, action) => {
      state.userUnregisteredEventsLoading = false;
      state.userRegisteredEventsLoading = false;
    });

    builder.addCase(unRegisterEventForUser.pending, (state, action) => {
      state.userUnregisteredEventsLoading = true;
      state.userRegisteredEventsLoading = true;
    });
    builder.addCase(unRegisterEventForUser.fulfilled, (state, action) => {});
    builder.addCase(unRegisterEventForUser.rejected, (state, action) => {
      state.userUnregisteredEventsLoading = false;
      state.userRegisteredEventsLoading = false;
    });
  },
});

export const {
  setReigsteredEventsBounds,
  setUnRegisteredEventBounds,
  setUnRegisteteredListActiveState,
  setRegisteredListActiveState,
} = UserEventSlice.actions;
