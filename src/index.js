import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mainRouter from '../routes';
import MongoStore from 'connect-mongo';
import config from '../config';

const ttlSeconds = 60;

const StoreOptions = {
    store: MongoStore.create({
        mongoUrl: config.URL_MONGOATLAS,
        crypto:{
            secret: 'squirrel'
        }
    }),
    secret: 'secretCode',
    resave:false,
    saveUninitialized: false,
    cookie:{
        maxAge: ttlSeconds * 1000.
    },
};

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(session(StoreOptions));
app.set('view engine','pug');
const viewsPath = path.resolve(__dirname,'../views');
app.set('views',viewsPath);
app.use(express.static('public'));

app.use('/api',mainRouter);

export default app;