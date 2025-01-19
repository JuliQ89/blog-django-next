export interface UserI {
  username: string;
  first_name: string;
  last_name: string;
  is_staff: false;
  joined_at: string;
  is_authenticated: true;
  image: string;
  bio: string;
  id: 2;
}

export type ActionType = {
  type: string;
  payload: {};
};
