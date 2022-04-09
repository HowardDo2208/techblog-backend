export class CreatePostDto {
  id?: number
  title: string
  content: string
}

export class UpdatePostDto {
  title?: string
  content?: string
}
