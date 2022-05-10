export class CreatePostDto {
  parentId?: number
  title: string
  published: boolean
  body: string
  tags: string
  image?: any
  userId?: string
}

export class UpdatePostDto {
  parentId?: number
  title?: string
  published?: boolean
  body?: string
  tags?: string[]
}

export interface PostSearchBody {
  id: number
  title: string
  metaTitle: string
  slug: string
  summary: string
  tags: string[]
  body: string
  author: string
  parent?: string
  published: boolean
}

export interface PostSearchResult {
  hits: {
    total: number
    hits: Array<{
      _source: PostSearchBody
    }>
  }
}
