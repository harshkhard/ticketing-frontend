import { useEffect } from "react";
import { useAppDispatch } from "../../../../hooks/redux";
import {
  getUserRegisteredEvents,
  getUserUnRegisteredEvents,
} from "../../../../store/slices/userEventsSlice";

export const useUserEvents = () => {
  const dispatch = useAppDispatch();

  const getData = () => {
    dispatch(getUserRegisteredEvents({}));
    dispatch(getUserUnRegisteredEvents({}));
  };

  useEffect(() => {
    getData();
  }, []);
};
