import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { TableService } from './table.service';
import { TableEntity } from '../entities/table-entity.entity';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { TableStatusEnum } from '../entities/table-entity.entity';

@ApiTags('table')
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tables' })
  @ApiResponse({ status: 200, type: [TableEntity] })
  findAll() {
    return this.tableService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get table by id' })
  @ApiResponse({ status: 200, type: TableEntity })
  findOne(@Param('id') id: string) {
    return this.tableService.findOne(+id);
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Get tables by status' })
  findByStatus(@Param('status') status: TableStatusEnum) {
    return this.tableService.findByStatus(status);
  }

  @Post()
  @ApiOperation({ summary: 'Create table' })
  @ApiBody({ type: CreateTableDto })
  @ApiResponse({ status: 201, type: TableEntity })
  create(@Body() data: CreateTableDto) {
    return this.tableService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update table' })
  @ApiBody({ type: UpdateTableDto })
  @ApiResponse({ status: 200, type: TableEntity })
  update(@Param('id') id: string, @Body() data: TableEntity) {
    return this.tableService.update(+id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete table' })
  @ApiResponse({ status: 204 })
  remove(@Param('id') id: string) {
    return this.tableService.remove(+id);
  }
}
