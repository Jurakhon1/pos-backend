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
import { ReviewService } from './review.service';
import { Review } from '../entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@ApiTags('review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  @ApiOperation({ summary: 'Get all reviews' })
  @ApiResponse({ status: 200, type: [Review] })
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get review by id' })
  @ApiResponse({ status: 200, type: Review })
  findOne(@Param('id') id: number) {
    return this.reviewService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create review' })
  @ApiBody({ type: CreateReviewDto })
  @ApiResponse({ status: 201, type: Review })
  create(@Body() data: CreateReviewDto) {
    return this.reviewService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update review' })
  @ApiBody({ type: UpdateReviewDto })
  @ApiResponse({ status: 200, type: Review })
  update(@Param('id') id: number, @Body() data: UpdateReviewDto) {
    return this.reviewService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete review' })
  @ApiResponse({ status: 204 })
  remove(@Param('id') id: number) {
    return this.reviewService.remove(id);
  }
}
