import { Box, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import {
  ListType,
  checkForConflictingEvents,
  checkForRegisteredEvent,
  checkIfPointExistInsideBounds,
  checkIfPointExistInsideRegisteredBounds,
} from "../../utils/utils";
import { EventList } from "../EventList";
import { useLayoutEffect, useRef } from "react";
import {
  registerUserForEvent,
  setRegisteredListActiveState,
  setUnRegisteredEventBounds,
} from "../../../../../store/slices/userEventsSlice";
import { Point } from "framer-motion";
import { EventListContainer } from "../../styles";
import { EventItemHandler } from "../Event";
import { ListBackdrop } from "../Backdrop";
import { DEFAULT_LOADER_SÍZE } from "../../../../../utils/constants";

export const UnRegisteredEventList = () => {
  const dispatch = useAppDispatch();
  const elemRef = useRef<HTMLDivElement>(null);

  const {
    userUnregisteredEvents,
    unRegisteredListActive,
    userUnregisteredEventsLoading,
  } = useAppSelector((store) => store.event);
  const listRef = useRef<EventItemHandler>(null);

  const registerEvent = (index: number) => {
    dispatch(registerUserForEvent({ eventIndex: index }));
  };

  const handleButtonClick = (index: number) => {
    if (checkForRegisteredEvent(userUnregisteredEvents[index])) {
      registerEvent(index);
    }
  };

  const handleDrag = (point: Point, index: number) => {
    dispatch(setRegisteredListActiveState(true));
  };

  const handleDragEnd = (point: Point, index: number) => {
    dispatch(setRegisteredListActiveState(false));
    if (
      checkIfPointExistInsideRegisteredBounds(point) &&
      checkForRegisteredEvent(userUnregisteredEvents[index])
    ) {
      registerEvent(index);
    } else {
      listRef?.current?.snapToOrigin(index);
    }
  };

  useLayoutEffect(() => {
    if (elemRef.current) {
      dispatch(
        setUnRegisteredEventBounds({
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
      component={"div"}
      ref={elemRef}
      isActive={unRegisteredListActive}
      isLoading={userUnregisteredEventsLoading}
    >
      <ListBackdrop
        title={"Drop to unregister for event"}
        isActive={unRegisteredListActive || userUnregisteredEventsLoading}
        isLoader={userUnregisteredEventsLoading}
      />
      <EventList
        events={userUnregisteredEvents}
        title="All events"
        handleDrag={handleDrag}
        handleDragEnd={handleDragEnd}
        ref={listRef}
        onButtonClick={handleButtonClick}
        listType={ListType.UNREGISTERED}
      />
    </EventListContainer>
  );
};
