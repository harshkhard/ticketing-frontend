import { PanInfo, useAnimate } from "framer-motion";
import { UserEvent } from "../../../../../models/userEvents/userEventsResponse";
import {
  ANIMATION_DURATION_EVENT,
  ListType,
  getEventStartAndEndTime,
} from "../../utils/utils";
import { ListBox, TitleFont } from "./styles";
import React, {
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Button, Chip, Divider, Grid, Typography } from "@mui/material";

export type EventItemHandler = {
  snapToOrigin: (index?: number) => void;
};

type EventItemProps = {
  event: UserEvent;
  delay: number;
  onDrag: (event: MouseEvent, info: PanInfo) => void;
  onDragEnd: (event: MouseEvent, info: PanInfo) => void;
  onButtonClick: () => void;
  eventType: ListType;
};

export const EventItem = React.forwardRef<EventItemHandler, EventItemProps>(
  (props: EventItemProps, ref) => {
    const [scope, animate] = useAnimate<HTMLDivElement>();
    const [isDragging, setIsDragging] = useState(false);

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
        isDragging={isDragging}
        drag
        dragMomentum={false}
        initial={{ opacity: 0 }}
        transition={{ duration: ANIMATION_DURATION_EVENT, delay: props.delay }}
        animate={{ opacity: 1 }}
        onDrag={(event: MouseEvent, info) => {
          setIsDragging(true);
          props.onDrag(event, info);
        }}
        onDragEnd={(event: MouseEvent, info) => {
          setIsDragging(false);
          props.onDragEnd(event, info);
        }}
      >
        <Grid container direction={"column"} spacing={1}>
          <Grid
            item
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item>
              <TitleFont>{`${props.event.event_name}`}</TitleFont>
            </Grid>
            <Grid item>
              <Chip label={props.event.event_category} color={"info"} />
            </Grid>
          </Grid>
          <Grid container item>
            <Grid item>
              <Typography variant="body1">
                {getEventStartAndEndTime(
                  props.event.start_time,
                  props.event.end_time
                )}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item justifyContent={"flex-end"}>
            <Grid item>
              <Button
                variant="outlined"
                color={
                  props.eventType === ListType.UNREGISTERED
                    ? "primary"
                    : "secondary"
                }
                onClick={props.onButtonClick}
                size="small"
              >
                {props.eventType === ListType.REGISTERED
                  ? "Remove event"
                  : "Add event"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </ListBox>
    );
  }
);
