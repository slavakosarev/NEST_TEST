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
    try {
      const asset = await this.watchlistRepository.create({
        name: dto.name,
        assetId: dto.assetId,
        userId: user.id,
      })
      return {
        user: user.id,
        name: asset.name,
        assetId: asset.assetId,
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  async deleteAsset(userId: number, assetId: string): Promise<boolean> {
    try {
      await this.watchlistRepository.destroy({
        where: { user: userId, id: assetId },
      })
      return true
    } catch (e) {
      throw new Error(e)
    }
  }
}
