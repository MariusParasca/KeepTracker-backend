require('dotenv').config();

import express, { Application } from 'express';
import cors from 'cors';

import 'module-alias/register';
import './connection';

import loginController, { loginValidator } from '@controllers/loginController';
import tokenController, { tokenValidator } from '@controllers/tokenController';
import logoutController, { logoutValidator } from '@controllers/logoutController';
import registerController, { registerValidator } from '@controllers/registerController';
import checkTokenController, { checkTokenValidator } from '@controllers/checkTokenController';

const app: Application = express();

app.use(cors(), express.json());

app.post('/register', registerValidator, registerController);

app.post('/login', loginValidator, loginController);

app.post('/token', tokenValidator, tokenController);

app.delete('/logout', logoutValidator, logoutController);

app.post('/checkToken', checkTokenValidator, checkTokenController);

app.listen(9001, () => console.info(`Server started on port 9001`));
