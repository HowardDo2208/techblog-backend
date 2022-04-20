import { Controller, Delete, Get, Param } from '@nestjs/common'
import { deleteUser } from 'supertokens-node'
import { getUsersByEmail } from 'supertokens-node/recipe/thirdpartyemailpassword'

@Controller('auth')
export class AuthController {
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await deleteUser(id)
  }

  @Get('testUsers')
  async deleteTestUsers() {
    const emails = ['tanhopdo2000@gmail.com', 'howarddo2208@gmail.com']
    const users = await Promise.all(emails.map((mail) => getUsersByEmail(mail)))
    const userIds = users.map((user) => user[0].id)
    return await Promise.all(userIds.map((id) => deleteUser(id)))
  }
}
