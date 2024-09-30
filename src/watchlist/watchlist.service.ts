import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Watchlist } from './models/watchlist.model'
import { WatchlistDto } from './dto'
import { CreateUserResponse } from './response'

@Injectable()
export class WatchlistService {
  constructor(
    @InjectModel(Watchlist)
    private readonly watchlistRepository: typeof Watchlist,
  ) {
    this.watchlistRepository.sync({ force: true }) // Перезапись базы данных
  }

  async createAsset(user: any, dto: WatchlistDto): Promise<CreateUserResponse> {
    const watchlist = await this.watchlistRepository.create({
      userId: user.id, // Используем userId вместо user
      name: dto.name,
      assetId: dto.assetId,
    })
    return watchlist.toJSON()
  }

  async deleteAsset(userId: number, assetId: string): Promise<boolean> {
    await this.watchlistRepository.destroy({
      where: { userId: userId, id: assetId }, // Используем userId вместо user
    })
    return true
  }
}
