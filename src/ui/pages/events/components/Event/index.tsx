import { PanInfo, useAnimate } from "framer-motion";
import { UserEvent } from "../../../../../models/userEvents/userEventsResponse";
import { ANIMATION_DURATION_EVENT } from "../../utils/constants";
import { ListBox } from "./styles";
import React, {
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export type EventItemHandler = {
  snapToOrigin: (index?: number) => void;
};

type EventItemProps = {
  event: UserEvent;
  delay: number;
  onDrag: (event: MouseEvent, info: PanInfo) => void;
  onDragEnd: (event: MouseEvent, info: PanInfo) => void;
};

export const EventItem = React.forwardRef<EventItemHandler, EventItemProps>(
  (props: EventItemProps, ref) => {
    const [scope, animate] = useAnimate<HTMLDivElement>();

    useImperativeHandle(ref, () => {
      return {
        snapToOrigin: () => {
          if (scope.current) {
            animate(
              scope.current,
              {
                x: 0,
                y: 0,
              },
              { duration: ANIMATION_DURATION_EVENT }
            );
          }
        },
      };
    });

    return (
      <ListBox
        ref={scope}
        drag
        dragMomentum={false}
        initial={{ opacity: 0 }}
        transition={{ duration: ANIMATION_DURATION_EVENT, delay: props.delay }}
        animate={{ opacity: 1 }}
        onDrag={props.onDrag}
        onDragEnd={props.onDragEnd}
      >
        {props.event.event_name}
      </ListBox>
    );
  }
);
