import { useEffect, useLayoutEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import {
  ListType,
  checkForConflictingEvents,
  checkIfPointExistInsideBounds,
  checkIfPointExistInsideRegisteredBounds,
  checkIfPointExistInsideUnRegisteredBounds,
} from "../../utils/utils";
import { EventList } from "../EventList";
import React from "react";
import { Box, CircularProgress } from "@mui/material";
import {
  setReigsteredEventsBounds,
  setUnRegisteteredListActiveState,
  unRegisterEventForUser,
} from "../../../../../store/slices/userEventsSlice";
import { Point } from "framer-motion";
import { EventListContainer } from "../../styles";
import { EventItemHandler } from "../Event";
import { ListBackdrop } from "../Backdrop";
import { DEFAULT_LOADER_SÍZE } from "../../../../../utils/constants";

export const RegisteredEventList = () => {
  const {
    userRegisteredEvents,
    registeredListActive,
    userRegisteredEventsLoading,
  } = useAppSelector((store) => store.event);
  const elemRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<EventItemHandler>(null);
  const dispatch = useAppDispatch();

  const unRegisterEvent = (index: number) => {
    dispatch(unRegisterEventForUser({ eventIndex: index }));
  };

  const handleButtonClick = (index: number) => {
    unRegisterEvent(index);
  };

  const handleDrag = (point: Point, index: number) => {
    dispatch(setUnRegisteteredListActiveState(true));
  };

  const handleDragEnd = (point: Point, index: number) => {
    dispatch(setUnRegisteteredListActiveState(false));
    if (checkIfPointExistInsideUnRegisteredBounds(point)) {
      unRegisterEvent(index);
    } else {
      listRef?.current?.snapToOrigin(index);
    }
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
      isLoading={userRegisteredEventsLoading}
    >
      <ListBackdrop
        title={"Drop to register for event"}
        isActive={registeredListActive || userRegisteredEventsLoading}
        isLoader={userRegisteredEventsLoading}
      />
      <EventList
        events={userRegisteredEvents}
        title="Registered Events"
        handleDrag={handleDrag}
        handleDragEnd={handleDragEnd}
        ref={listRef}
        onButtonClick={handleButtonClick}
      />
    </EventListContainer>
  );
};
