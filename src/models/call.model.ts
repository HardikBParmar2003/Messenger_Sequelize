import { Table, Model, PrimaryKey, AutoIncrement, Column, DataType, ForeignKey, BelongsTo, CreatedAt, UpdatedAt } from "sequelize-typescript";
import { User } from "./user.model";
import { allow } from "joi";

export enum callStatus{
  started = 'started',
  acepted = 'acepted',
  ended = 'ended'
}

@Table({tableName:"call_table",timestamps:true})
export class Call extends Model<Call>{
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!:number

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  caller_id!: number;
  @BelongsTo(() => User, { foreignKey: "caller_id" })
  caller!: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  receiver_id!: number;
  @BelongsTo(() => User, { foreignKey: "receiver_id" })
  receiver!: User;

  @Column({
    type:DataType.ENUM("started","accepted","ended"),
    allowNull:false
  })
  status!:callStatus

  @CreatedAt
  @Column (DataType.DATE)
  createdAt!:Date

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!:Date
}