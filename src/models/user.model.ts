import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  HasMany,
  ForeignKey,
  BelongsToMany,
} from "sequelize-typescript";
import { Group } from "./group.model";
import { Member } from "./group_member_table.model";
import { Chat } from "./chat.model";

@Table({ tableName: "users", timestamps: true })
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  user_id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: "unique_email_constraint",
    validate: {
      isEmail: true, // Must be a valid email
    },
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  profile_photo!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @HasMany(() => Group, { foreignKey: "user_id" })
  groups!: Group[];

  @HasMany(() => Member, { foreignKey: "user_id" })
  member!: Member[];

  @HasMany(() => Chat, { foreignKey: "sender_id" })
  sentchats!: Chat[];

  @HasMany(() => Chat, { foreignKey: "receiver_id" })
  receivedchats!: Chat[];

  @BelongsToMany(() => Group, () => Chat)
  groupChat!: Group[];

  @BelongsToMany(() => Group, () => Member)
  memberGroups!: Group[];
}
