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
import { Role } from "./role.model";
import { Permission } from "./permission.model";

@Table({ tableName: "role_permission_table", timestamps: true })
export class RolePermission extends Model<RolePermission> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  role_id!: number;
  @BelongsTo(() => Role, { foreignKey: "role_id" })
  role!: Role;

  @ForeignKey(() => Permission)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  permission_id!: number;
  @BelongsTo(() => Permission, { foreignKey: "permission_id" })
  permission!: Permission;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;
}
