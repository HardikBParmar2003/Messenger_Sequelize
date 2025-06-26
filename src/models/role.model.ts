import { allow } from "joi";
import {
  AutoIncrement,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { Member } from "./group_member_table.model";
import { Permission } from "./permission.model";
import { RolePermission } from "./rolepermission.model";

@Table({ tableName: "role_table", timestamps: true })
export class Role extends Model<Role> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  role_id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role!: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @HasMany(() => Member,{foreignKey:"role_id"})
  members!: Member[];

  @BelongsToMany(()=>Permission,()=>RolePermission)
  permissions!:Permission[]
}
