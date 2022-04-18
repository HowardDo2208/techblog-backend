export class CreatePostDto {
  parentId?: number
  title: string
  metaTitle?: string
  slug?: string
  summary: string
  published: boolean
  content: string
  categoryIds?: number[]
  tagIds?: number[]
}

export class UpdatePostDto {
  parentId?: number
  title?: string
  metaTitle?: string
  slug?: string
  summary?: string
  published?: boolean
  content?: string
  categoryIds?: number[]
  tagIds?: number[]
}

export interface PostSearchBody {
  id: number
  title: string
  metaTitle: string
  slug: string
  summary: string
  tags: string[]
  categories: string[]
  content: string
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
