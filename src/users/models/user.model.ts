import { HasMany } from 'sequelize-typescript'
import { Model, Table, Column } from 'sequelize-typescript'
import { Watchlist } from 'src/watchlist/models/watchlist.model'
@Table
export class User extends Model {
  @Column
  name: string

  @Column
  nickName: string

  @Column
  email: string

  @Column
  password: string

  @HasMany(() => Watchlist, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  watchlist: Watchlist[]
}
