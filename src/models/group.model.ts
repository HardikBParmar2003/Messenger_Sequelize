import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";
import { User } from "./user.model";
import { Member } from "./group_member_table.model";
import { Chat } from "./chat.model";

@Table({ tableName: "group_table", timestamps: true, paranoid: true })
export class Group extends Model<Group> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  group_id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  user_id!: number;
  @BelongsTo(() => User, { foreignKey: "user_id" })
  user!: User;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  group_name!: string;

  @Column({
    type:DataType.STRING,
    allowNull:true
  })
  profile_photo!:string

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @DeletedAt
  @Column(DataType.DATE)
  deletedAt!: Date;

  @HasMany(() => Member, { foreignKey: "group_id" })
  groups!: Member[];

  @HasMany(() => Chat, { foreignKey: "group_id" })
  chat!: Chat[];

  @BelongsToMany(() => User, () => Chat)
  usersWhoChatted!: User[];

  @BelongsToMany(()=>User,()=>Member)
  members!:User[]

}
