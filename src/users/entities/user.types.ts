export class CreateUserDto {
  id: string
  email: string
}

export class UpdateUserDto {}

export interface UserSearchBody {
  id: string
  firstName?: string
  lastName?: string
  email: string
  mobile?: string
  intro?: string
  posts?: string[]
}

export interface UserSearchResult {
  hits: {
    total: number
    hits: Array<{
      _source: UserSearchBody
    }>
  }
}
