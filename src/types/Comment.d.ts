interface Comment {
  username: string,
  content: string,
  timestamp: number,
  post: string,
  parent: string,
  children: string[],
  _id: string,
}

export default Comment;
