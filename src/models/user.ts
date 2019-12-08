import {
	Model,
	Column,
	Table,
	PrimaryKey,
	IsUUID,
	CreatedAt,
	UpdatedAt,
	AllowNull,
	ForeignKey,
	BelongsTo,
} from 'sequelize-typescript';

import { Role } from './role';

@Table
export class User extends Model<User> {
	@IsUUID(4)
	@PrimaryKey
	@Column
	id!: number;

	@AllowNull(false)
	@Column
	email!: number;

	@Column
	firstName!: string;

	@Column
	lastName!: string;

	@AllowNull(false)
	@ForeignKey(() => Role)
	@Column
	roleId!: number;

	@BelongsTo(() => Role)
	role!: Role;

	@CreatedAt
	@Column
	createdAt!: Date;

	@UpdatedAt
	@Column
	updatedAt!: Date;
}
