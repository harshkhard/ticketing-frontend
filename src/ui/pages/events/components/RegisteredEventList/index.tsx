import { useEffect, useLayoutEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import { ListType } from "../../utils/constants";
import { EventList } from "../EventList";
import React from "react";
import { Box } from "@mui/material";
import {
  setReigsteredEventsBounds,
  setUnRegisteteredListActiveState,
} from "../../../../../store/slices/userEventsSlice";
import { Point } from "framer-motion";
import { EventListContainer } from "../../styles";
import { EventItemHandler } from "../Event";

export const RegisteredEventList = () => {
  const { userRegisteredEvents, registeredListActive } = useAppSelector(
    (store) => store.event
  );
  const elemRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<EventItemHandler>(null);
  const dispatch = useAppDispatch();

  const handleDrag = (point: Point) => {
    dispatch(setUnRegisteteredListActiveState(true));
  };

  const handleDragEnd = (point: Point) => {
    dispatch(setUnRegisteteredListActiveState(false));
  };

  useLayoutEffect(() => {
    if (elemRef.current) {
      dispatch(
        setReigsteredEventsBounds({
          startX: elemRef.current.getBoundingClientRect().x,
          startY: elemRef.current.getBoundingClientRect().y,
          endX:
            elemRef.current.getBoundingClientRect().x +
            elemRef.current.getBoundingClientRect().width,
          endY:
            elemRef.current.getBoundingClientRect().y +
            elemRef.current.getBoundingClientRect().height,
        })
      );
    }
  }, []);

  return (
    <EventListContainer
      ref={elemRef}
      component={"div"}
      isActive={registeredListActive}
    >
      <EventList
        events={userRegisteredEvents}
        title="Registered Events"
        handleDrag={handleDrag}
        handleDragEnd={handleDragEnd}
        ref={listRef}
      />
    </EventListContainer>
  );
};
