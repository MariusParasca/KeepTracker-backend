import { Model, Column, Table, PrimaryKey, IsUUID, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
	@IsUUID(4)
	@PrimaryKey
	@Column
	id!: number;

	@Column
	email!: number;

	@Column
	firstName!: string;

	@Column
	lastName!: string;

	@CreatedAt
	@Column
	createdAt!: Date;

	@UpdatedAt
	@Column
	updatedAt!: Date;
}
