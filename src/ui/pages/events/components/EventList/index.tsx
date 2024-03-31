import { Box, Divider, Grid, List, Typography } from "@mui/material";
import { UserEvent } from "../../../../../models/userEvents/userEventsResponse";
import { ListContainer } from "./styles";
import { EventItem } from "../Event";

type EventListProps = {
  events: UserEvent[];
  title: string;
};

export const EventList = (props: EventListProps) => {
  return (
    <ListContainer>
      <Box>
        <Typography variant="h5">{props.title}</Typography>
        <Divider />
      </Box>
      {props.events.map((val) => {
        return <EventItem event={val} key={val.id} />;
      })}
    </ListContainer>
  );
};
