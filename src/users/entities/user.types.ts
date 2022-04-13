export class CreateUserDto {
    id?: number
    name: string
    email: string
    password: string
  }
  
  export class UpdateUserDto {
    
    name?: string
    email?: string
    password?: string
  }
  
  export interface UserSearchBody {
    id: number
    name: string
    email: string
    password: string
  }
  
  export interface UserSearchResult {
    hits: {
      total: number
      hits: Array<{
        _source: UserSearchBody
      }>
    }
  }
  