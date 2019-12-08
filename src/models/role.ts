import { Model, Column, Table, PrimaryKey, IsUUID, AllowNull, ForeignKey } from 'sequelize-typescript';

@Table({
	timestamps: false,
})
export class Role extends Model<Role> {
	@IsUUID(4)
	@PrimaryKey
	@Column
	id!: number;

	@AllowNull(false)
	@Column
	name!: string;

	@AllowNull(false)
	@ForeignKey(() => Role)
	@Column
	permissionId!: number;
}
