export interface UserI {
  username: string;
  first_name: string;
  last_name: string;
  is_staff: false;
  joined_at: string;
  is_authenticated: true;
  profile: {
    image: string | null;
    bio: string;
    id: number;
  };
  id: number;
}

export type ActionType = {
  type: string;
  payload: {};
};

export interface CommentI {
  user: UserI;
  created_at: string;
  text: string;
  post: {
    id: string;
  };
  id: number;
}

export interface TagI {
  name: string;
  id: number;
}

export interface PostI {
  user: UserI;
  tag: TagI[];
  content: string;
  heading: string;
  created_at: string;
  likedCount: number;
  liked: { id: number }[];
  comments: CommentI[];
  id: string;
}

export interface TagI {
  name: string;
  id: number;
}
