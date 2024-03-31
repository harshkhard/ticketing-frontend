import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./slices/authSlice";
import { UserEventSlice } from "./slices/userEventsSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    event: UserEventSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
