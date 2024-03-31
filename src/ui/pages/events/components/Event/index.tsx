import { UserEvent } from "../../../../../models/userEvents/userEventsResponse";
import { ListBox } from "./styles";

type EventItemProps = {
  event: UserEvent;
};

export const EventItem = (props: EventItemProps) => {
  return (
    <ListBox drag dragSnapToOrigin>
      {props.event.event_name}
    </ListBox>
  );
};
