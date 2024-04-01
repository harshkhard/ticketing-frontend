import { Box, Divider, Grid, List, Typography } from "@mui/material";
import { UserEvent } from "../../../../../models/userEvents/userEventsResponse";
import { EmptyListContainer, ListContainer, ListFlexContainer } from "./styles";
import { EventItem, EventItemHandler } from "../Event";
import { ANIMATION_DELAY_EVENT_LIST, ListType } from "../../utils/utils";
import { PanInfo, Point } from "framer-motion";
import React, { useImperativeHandle, useRef } from "react";

type EventListProps = {
  events: UserEvent[];
  title: string;
  handleDrag: (point: Point, index: number) => void;
  handleDragEnd: (info: Point, index: number) => void;
  onButtonClick: (index: number) => void;
};

export const EventList = React.forwardRef<EventItemHandler, EventListProps>(
  (props: EventListProps, ref) => {
    const elemRef = useRef<(EventItemHandler | null)[]>([]);

    const handleDrag = (_: MouseEvent, info: PanInfo, index: number) => {
      props.handleDrag(info.point, index);
    };

    const handleDragEnd = (_: MouseEvent, info: PanInfo, index: number) => {
      props.handleDragEnd(info.point, index);
    };

    useImperativeHandle(ref, () => {
      return {
        snapToOrigin: (index?: number) => {
          if (index !== undefined) {
            elemRef?.current?.[index]?.snapToOrigin();
          }
        },
      };
    });

    return (
      <ListContainer>
        <Box>
          <Typography variant="h5">{props.title}</Typography>
          <Divider />
        </Box>
        {props.events.length === 0 ? (
          <EmptyListContainer>
            <Typography variant="h6">No events</Typography>
          </EmptyListContainer>
        ) : (
          <Grid container spacing={3}>
            {props.events.map((val, index) => {
              return (
                <Grid item xs={6} key={val.id}>
                  <EventItem
                    onDrag={(event, info) => handleDrag(event, info, index)}
                    ref={(elem) => (elemRef.current[index] = elem)}
                    event={val}
                    delay={index * ANIMATION_DELAY_EVENT_LIST}
                    onDragEnd={(event, info) =>
                      handleDragEnd(event, info, index)
                    }
                    onButtonClick={() => {
                      props.onButtonClick(index);
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
      </ListContainer>
    );
  }
);
