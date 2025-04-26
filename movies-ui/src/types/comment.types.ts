import {Movie} from "./movie.types";

export type Comment = {
  id: number
  username: string,
  text: string,
  timestamp: string,
  movie?: Movie
}

export type AddCommentReq = {
  text: string
}
