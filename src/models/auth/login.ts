export type LoginResponse = {
  athlete_name: string;
  athlete_id: string;
  id: number;
};

export type LoginActionPayload = {
  userName: string;
};

export type SignupResponse = {
  athlete_name: string;
  athlete_id: string;
  id: number;
};

export type SignupAcionPayload = {
  userName: string;
  name: string;
};
