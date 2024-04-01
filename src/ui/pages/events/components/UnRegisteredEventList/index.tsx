import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import { ListType, checkIfPointExistInsideBounds } from "../../utils/constants";
import { EventList } from "../EventList";
import { useLayoutEffect, useRef } from "react";
import {
  setRegisteredListActiveState,
  setUnRegisteredEventBounds,
} from "../../../../../store/slices/userEventsSlice";
import { Point } from "framer-motion";
import { EventListContainer } from "../../styles";
import { EventItemHandler } from "../Event";

export const UnRegisteredEventList = () => {
  const dispatch = useAppDispatch();
  const elemRef = useRef<HTMLDivElement>(null);

  const {
    registeredEventsBounds,
    userUnregisteredEvents,
    unRegisteredListActive,
  } = useAppSelector((store) => store.event);
  const listRef = useRef<EventItemHandler>(null);

  const handleDrag = (point: Point, index: number) => {
    dispatch(setRegisteredListActiveState(true));
  };

  const handleDragEnd = (point: Point, index: number) => {
    dispatch(setRegisteredListActiveState(false));
    if (registeredEventsBounds) {
      if (checkIfPointExistInsideBounds(point, registeredEventsBounds)) {
      } else {
        listRef?.current?.snapToOrigin(index);
      }
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
    >
      <EventList
        events={userUnregisteredEvents}
        title="All events"
        handleDrag={handleDrag}
        handleDragEnd={handleDragEnd}
        ref={listRef}
      />
    </EventListContainer>
  );
};
