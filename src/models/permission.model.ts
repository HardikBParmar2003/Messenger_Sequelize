import { allow } from "joi";
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
import { Role } from "./role.model";
import { RolePermission } from "./rolepermission.model";

@Table({ tableName: "permission_table", timestamps: true })
export class Permission extends Model<Permission> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  permission_id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  permission!: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @BelongsToMany(() => Role, () => RolePermission)
  roles!: Role[];
}
