import { Controller, Delete, Param } from '@nestjs/common'
import { deleteUser } from 'supertokens-node'

@Controller('auth')
export class AuthController {
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await deleteUser(id)
  }
}
