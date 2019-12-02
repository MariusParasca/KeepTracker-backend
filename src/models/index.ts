import { Sequelize, Model, ModelCtor } from 'sequelize-typescript';
import fs from 'fs';
import path from 'path';

const sequelize = new Sequelize('KeepTracker', 'postgres', 'telfon25', {
	dialect: 'postgres',
	host: 'localhost',
	pool: {
		max: 5,
		min: 0,
		idle: 10000,
	},
});

function capitalizeFirstLetter(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const getAllModels = (): ModelCtor<Model<any, any>>[] => {
	const files: Array<string> = fs.readdirSync(__dirname);
	const models: ModelCtor<Model<any, any>>[] = [];
	for (const file of files) {
		if (file !== 'index.ts') {
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			const model = require(path.join(__dirname, file));
			const modelName: string = file.split('.')[0];
			models.push(model[capitalizeFirstLetter(modelName)]);
		}
	}
	return models;
};

(async (): Promise<void> => {
	await sequelize.addModels(getAllModels());
})();

export default sequelize;
