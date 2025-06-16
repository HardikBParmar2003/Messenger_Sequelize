import { INTEGER } from "sequelize";
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

@Table({ tableName: "status_table", timestamps: true })
export class Status extends Model<Status> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  status_id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  user_id!: number;
  @BelongsTo(() => User, { foreignKey: "user_id" })
  user!: User;

  @Column(DataType.STRING)
  status!: string;

  @Column(DataType.STRING)
  description!: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @Column(DataType.DATE)
  expiresAt!:Date
}
