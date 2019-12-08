import { Model, Column, Table, PrimaryKey, IsUUID, AllowNull } from 'sequelize-typescript';

@Table({
	timestamps: false,
})
export class Permission extends Model<Permission> {
	@IsUUID(4)
	@PrimaryKey
	@Column
	id!: number;

	@AllowNull(false)
	@Column
	name!: string;
}
