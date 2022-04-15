export class CreateUserDto {
  id?: number
  firstName: string
  lastName: string
  mobile?: string
  email: string
  password: string
}

export class UpdateUserDto {
  firstName?: string
  lastName?: string
  mobile?: string
  intro?: string
  profile?: string
  password?: string
}

export interface UserSearchBody {
  id: number
  firstName: string
  lastName: string
  email: string
  mobile?: string
  intro?: string
  posts: string[]
}

export interface UserSearchResult {
  hits: {
    total: number
    hits: Array<{
      _source: UserSearchBody
    }>
  }
}
