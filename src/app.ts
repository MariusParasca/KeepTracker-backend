import express, { Application, Request, Response, NextFunction } from 'express';
import sequelize from './models';
import { User } from './models/user';

const app: Application = express();

(async (): Promise<void> => {
	await sequelize.sync({ force: true });
	console.log('connected to database');
	console.log(await User.findAll());

	app.get('/', (req: Request, res: Response, next: NextFunction) => {
		res.send('Hello');
	});

	app.listen(5000, () => console.log('Server running'));
})();
