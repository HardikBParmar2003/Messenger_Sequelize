import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Group } from "./group.model";
import { User } from "./user.model";

@Table({ tableName: "group_member_table", timestamps: true })
export class Member extends Model<Member> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Group)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  group_id!: number;
  @BelongsTo(() => Group, { foreignKey: "group_id" })
  group!: Group;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  admin_id!: number;
  @BelongsTo(() => User, { foreignKey: "user_id" })
  admin!: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  user_id!: number;
  @BelongsTo(() => User, { foreignKey: "user_id" })
  user!: User;
}
