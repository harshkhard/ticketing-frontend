import { useAppSelector } from "../../../../../hooks/redux";
import { EventList } from "../EventList";

export const RegisteredEventList = () => {
  const { userRegisteredEvents } = useAppSelector((store) => store.event);

  return <EventList events={userRegisteredEvents} title="Registered Events" />;
};
