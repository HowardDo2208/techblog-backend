export class CreatePostCommentDto {
  author: string
  body: string
  parentId?: number
  parentPost: number
}
