export class CreatePostDto {
  id?: number
  title: string
  content: string
}

export class UpdatePostDto {
  title?: string
  content?: string
}

export interface PostSearchBody {
  id: number
  title: string
  content: string
}

export interface PostSearchResult {
  hits: {
    total: number
    hits: Array<{
      _source: PostSearchBody
    }>
  }
}
