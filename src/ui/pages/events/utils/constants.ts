import { Point } from "framer-motion";
import { Bounds } from "../../../../store/slices/userEventsSlice";

export const ANIMATION_DELAY_EVENT_LIST = 0.2;
export const ANIMATION_DURATION_EVENT = 0.2;

export const EVENT_LIST_ANIMATION_DURATION = "0.3s";

export enum ListType {
  REGISTERED,
  UNREGISTERED,
}

export const checkIfPointExistInsideBounds = (point: Point, bounds: Bounds) => {
  return (
    point.x > bounds.startX &&
    point.x < bounds.endX &&
    point.y > bounds.startY &&
    point.y < bounds.endY
  );
};
