import { BaseApi } from "../base";

const baseApiPath = import.meta.env.VITE_BASE_API;
const userEventsApiPath = baseApiPath + "athlete_event";

export const UserEventApi = {
  getAllRegisteredEvents: (userId: number) => {
    return BaseApi({
      url: userEventsApiPath + "/registered_events",
      params: { athlete_id: userId },
      method: "POST",
    });
  },
  getAllUnregisteredEvents: (userId: number) => {
    return BaseApi({
      url: userEventsApiPath + "/un_registered_events",
      params: { athlete_id: userId },
      method: "GET",
    });
  },
  registerEvent: (userId: number, eventId: number) => {
    return BaseApi({
      url: userEventsApiPath + "/un_registered_events",
      data: { athlete_id: userId, event_id: eventId },
      method: "POST",
    });
  },
  unRegisterEvent: (userId: number, eventId: number) => {
    return BaseApi({
      url: userEventsApiPath + "/un_registered_events",
      data: { athlete_id: userId, event_id: eventId },
      method: "PATCH",
    });
  },
};
