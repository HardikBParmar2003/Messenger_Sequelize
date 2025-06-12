import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  PrimaryKey,
  Table,
  UpdatedAt,
  Model,
} from "sequelize-typescript";

@Table({ tableName: "otp_verification", timestamps: true })
export class Otp extends Model<Otp> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  otp!: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @Column(DataType.DATE)
  expiresAt!: Date;
}
