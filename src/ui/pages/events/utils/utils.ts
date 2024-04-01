import { Point } from "framer-motion";
import { Bounds } from "../../../../store/slices/userEventsSlice";
import { store } from "../../../../store";
import { UserEvent } from "../../../../models/userEvents/userEventsResponse";
import { toast } from "react-toastify";
import dayjs from "dayjs";

export const ANIMATION_DELAY_EVENT_LIST = 0.2;
export const ANIMATION_DURATION_EVENT = 0.2;

export const EVENT_LIST_ANIMATION_DURATION = "0.3s";

export enum ListType {
  REGISTERED,
  UNREGISTERED,
}

const MAX_ALLOWED_EVENTS = 3;

export enum RegsiteredEventErrorType {
  MAX_EVENTS,
  CONFLICTING_EVENT,
}

export const checkForMaxEvents = () => {
  return (
    store.getState().event.userRegisteredEvents.length <= MAX_ALLOWED_EVENTS
  );
};

export const checkForConflictingEvents = (selectedEvent: UserEvent) => {
  const registeredEvents = store.getState().event.userRegisteredEvents;
  const eventStartTime = dayjs(selectedEvent.start_time);
  const eventEndTime = dayjs(selectedEvent.end_time);
  for (let event of registeredEvents) {
    /**
     * Check for start time between intervals
     */
    if (
      dayjs(event.start_time).isBefore(eventStartTime) &&
      dayjs(event.end_time).isAfter(eventStartTime)
    ) {
      return false;
    }
    /**
     * Check for end time between intervals
     */
    if (
      dayjs(event.start_time).isBefore(eventEndTime) &&
      dayjs(event.end_time).isAfter(eventEndTime)
    ) {
      return false;
    }
  }
  return true;
};

export const checkForRegisteredEvent = (event: UserEvent) => {
  if (!checkForMaxEvents()) {
    toast.error(`Cannot add more than ${MAX_ALLOWED_EVENTS} events`);
    return false;
  }
  if (!checkForConflictingEvents(event)) {
    toast.error("Conflicting event, cannot select this event");
    return false;
  }
  return true;
};

export const checkIfPointExistInsideRegisteredBounds = (point: Point) => {
  const bounds = store.getState().event.registeredEventsBounds;
  if (bounds) {
    return checkIfPointExistInsideBounds(point, bounds);
  }
  return false;
};

export const checkIfPointExistInsideUnRegisteredBounds = (point: Point) => {
  const bounds = store.getState().event.unRegisteredEventsBounds;
  if (bounds) {
    return checkIfPointExistInsideBounds(point, bounds);
  }
  return false;
};

export const checkIfPointExistInsideBounds = (point: Point, bounds: Bounds) => {
  return (
    point.x > bounds.startX &&
    point.x < bounds.endX &&
    point.y > bounds.startY &&
    point.y < bounds.endY
  );
};
