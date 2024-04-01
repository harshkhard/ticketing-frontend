export type GetUserEventsActionPayload = {};

export interface UserEventsResponse {
  count: number;
  events: UserEvent[];
}

export interface UserEvent {
  id: number;
  event_category: string;
  event_name: string;
  start_time: Date;
  end_time: Date;
}

export type RegisterEventForUserActionPayload = {
  eventIndex: number;
};

export type UnRegisterEventForUserActionPayload = {
  eventIndex: number;
};
