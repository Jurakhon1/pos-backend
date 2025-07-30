import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody } from '@nestjs/swagger';
// import { JwtAuthGuard, RolesGuard, Roles } from '../auth/auth.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    type: [User],
    schema: {
      example: [
        {
          id: 1,
          email: 'admin@example.com',
          role: 'admin',
          is_active: true,
          createdAt: '2025-07-17T12:00:00.000Z',
          updatedAt: '2025-07-17T12:00:00.000Z',
        },
      ],
    },
  })
  findAll() {
    return this.userService.findAll();
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    type: User,
    schema: {
      example: {
        id: 1,
        email: 'admin@example.com',
        role: 'admin',
        is_active: true,
        createdAt: '2025-07-17T12:00:00.000Z',
        updatedAt: '2025-07-17T12:00:00.000Z',
      },
    },
  })
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    type: User,
    schema: {
      example: {
        id: 2,
        email: 'newuser@example.com',
        role: 'waiter',
        is_active: true,
        createdAt: '2025-07-19T12:00:00.000Z',
        updatedAt: '2025-07-19T12:00:00.000Z',
      },
    },
  })
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    type: User,
    schema: {
      example: {
        id: 2,
        email: 'updateduser@example.com',
        role: 'waiter',
        is_active: false,
        createdAt: '2025-07-19T12:00:00.000Z',
        updatedAt: '2025-07-19T12:10:00.000Z',
      },
    },
  })
  update(@Param('id') id: number, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 204,
    description: 'User deleted successfully',
  })
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
