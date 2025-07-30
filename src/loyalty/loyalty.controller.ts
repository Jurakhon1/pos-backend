import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoyaltyService } from './loyalty.service';
import { Loyalty } from '../entities/loyalty.entity';
import { CreateLoyaltyDto } from './dto/create-loyalty.dto';
import { UpdateLoyaltyDto } from './dto/update-loyalty.dto';

@ApiTags('loyalty')
@Controller('loyalty')
export class LoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}

  @Get()
  @ApiOperation({ summary: 'Get all loyalty records' })
  @ApiResponse({ status: 200, type: [Loyalty] })
  findAll() {
    return this.loyaltyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get loyalty record by id' })
  @ApiResponse({ status: 200, type: Loyalty })
  findOne(@Param('id') id: number) {
    return this.loyaltyService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create loyalty record' })
  @ApiBody({ type: CreateLoyaltyDto })
  @ApiResponse({ status: 201, type: Loyalty })
  create(@Body() data: CreateLoyaltyDto) {
    return this.loyaltyService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update loyalty record' })
  @ApiBody({ type: UpdateLoyaltyDto })
  @ApiResponse({ status: 200, type: Loyalty })
  update(@Param('id') id: number, @Body() data: UpdateLoyaltyDto) {
    return this.loyaltyService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete loyalty record' })
  @ApiResponse({ status: 204 })
  remove(@Param('id') id: number) {
    return this.loyaltyService.remove(id);
  }
}
