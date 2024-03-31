export type LoginResponse = {
  athlete_name: string;
  athlete_id: string;
};

export type LoginActionPayload = {
  userName: string;
};

export type SignupResponse = {
  athlete_name: string;
  athlete_id: string;
};

export type SignupAcionPayload = {
  userName: string;
  name: string;
};
