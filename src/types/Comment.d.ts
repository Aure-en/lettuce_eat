interface Comment {
  username: string,
  content: string,
  timestamp: number,
  post: string,
  parent: string,
  children: string[],
}

export default Comment;
