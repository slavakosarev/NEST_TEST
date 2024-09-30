import { Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from 'src/users/models/user.model'

@Table
export class Watchlist extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number // Обозначаем внешний ключ на таблицу User

  @Column
  name: string

  @Column
  assetId: string
}
