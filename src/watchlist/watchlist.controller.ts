import {
  Body,
  Controller,
  Delete,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { WatchlistService } from './watchlist.service'
import { JwtAuthGuard } from 'src/guards/jwt-guard'
import { WatchlistDto } from './dto'
import { CreateUserResponse } from './response'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @ApiTags('API')
  @ApiResponse({ status: 201, type: CreateUserResponse })
  @UseGuards(JwtAuthGuard)
  @Post('create')
  createAsset(
    @Body() assetDto: WatchlistDto,
    @Req() req,
  ): Promise<CreateUserResponse> {
    const user = req.user.publicUser
    return this.watchlistService.createAsset(user, assetDto)
  }

  @ApiTags('API')
  @ApiResponse({ status: 200, type: Boolean })
  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  deleteAsset(@Query('id') assetId: string, @Req() req): Promise<boolean> {
    // @Query - получаем id из url
    const { id } = req.user.publicUser.id
    return this.watchlistService.deleteAsset(id, assetId)
  }
}
