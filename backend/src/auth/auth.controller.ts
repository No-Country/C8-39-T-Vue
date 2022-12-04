import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto/index';
import { Auth } from './decorators';
import { UserRoles } from './enums/user.roles';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication and user management')
@ApiBearerAuth('Bearer')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('users/register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('users/login')
  @HttpCode(200)
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('users')
  findAll() {
    return this.authService.findAll();
  }

  @Get('users/:term')
  findOne(@Param('term') term: string) {
    return this.authService.findOne(term);
  }

  @Get('users/groups/:id')
  findGroupsByUser(@Param('id') id: string) {
    return this.authService.getGroupsByUser(id);
  }

  @Put('users/:id')
  // @Auth()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAuthDto: UpdateUserDto,
  ) {
    return this.authService.update(id, updateAuthDto);
  }

  @Delete('users/:id')
  @Auth(UserRoles.Admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.authService.remove(id);
  }
}
