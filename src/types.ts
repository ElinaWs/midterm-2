export interface IPost {
  id: number,
  title: string,
  body: string,
  tags: string[],
  reactions: {
    likes: number,
    dislikes: number
  };
  userId: number
};

export interface IComment {
  id: number,
  body: string,
  likes: number,
  user: {
    id: number,
    fullName: string
  };
};