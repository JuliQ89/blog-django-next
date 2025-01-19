export interface UserI {
  username: string;
  first_name: string;
  last_name: string;
  is_staff: false;
  joined_at: string;
  is_authenticated: true;
  profile: {
    image: null | string;
    bio: string;
    id: number;
  };
  id: number;
}

export type ActionType = {
  type: string;
  payload: {};
};
