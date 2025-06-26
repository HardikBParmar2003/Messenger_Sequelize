import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { Group } from "./group.model";
import { User } from "./user.model";
import { Role } from "./role.model";

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
  @BelongsTo(() => User, { foreignKey: "admin_id" })
  admin!: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  user_id!: number;
  @BelongsTo(() => User, { foreignKey: "user_id" })
  user!: User;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  role_id!: number;
  @BelongsTo(() => Role, { foreignKey: "role_id" })
  role!: Role;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;
}
