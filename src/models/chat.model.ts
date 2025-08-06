import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { User } from "./user.model";
import { Group } from "./group.model";


@Table({ tableName: "chat_table", timestamps: true })
export class Chat extends Model<Chat> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  sender_id!: number;
  @BelongsTo(() => User, { foreignKey: "sender_id" })
  sender!: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  receiver_id!: number;
  @BelongsTo(() => User, { foreignKey: "receiver_id" })
  receiver!: User;

  @ForeignKey(() => Group)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  group_id!: number;
  @BelongsTo(() => Group, { foreignKey: "group_id" })
  group!: Group;

  @Column(DataType.TEXT)
  message!: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;
}
