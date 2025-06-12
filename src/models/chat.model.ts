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

enum chatType {
  Personal = "personal",
  Group = "group",
}

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
  @BelongsTo(() => User, { foreignKey: "user_id" })
  sender!: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  receiver_id!: number;
  @BelongsTo(() => User, { foreignKey: "user_id" })
  receiver!: User;

  @ForeignKey(() => Group)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  group_id!: number;
  @BelongsTo(() => User, { foreignKey: "user_id" })
  group!: Group;

  @Column(DataType.STRING)
  message!: string;

  @Column({
    type: DataType.ENUM(...Object.values(chatType)),
    allowNull: true,
    defaultValue: null,
  })
  chat_type!: chatType;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;
}
