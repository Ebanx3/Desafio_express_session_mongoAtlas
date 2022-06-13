import express from 'express';
import mainRouter from '../routes';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import { loginFunc, signUpFunc } from './auth';
import processInfoFunc from './processInfo';

const app = express();

const ttlSeconds = 60 * 10;

const StoreOptions = {
    secret: 'secretCode',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: ttlSeconds * 1000.
    },
};

app.use(session(StoreOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use('login', loginFunc);
passport.use('signup', signUpFunc);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
const viewsPath = path.resolve(__dirname, '../views');
app.set('views', viewsPath);

app.use(express.static('public'));

app.use('/api', mainRouter);
app.get('/info', processInfoFunc)
export default app;