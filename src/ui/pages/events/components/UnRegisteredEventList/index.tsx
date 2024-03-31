import { useAppSelector } from "../../../../../hooks/redux";
import { EventList } from "../EventList";

export const UnRegisteredEventList = () => {
  const { userUnregisteredEvents } = useAppSelector((store) => store.event);

  return <EventList events={userUnregisteredEvents} title="All events" />;
};
