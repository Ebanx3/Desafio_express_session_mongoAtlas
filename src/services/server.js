import express from 'express';

import mainRouter from '../routes';

import path from 'path';



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine','pug');
const viewsPath = path.resolve(__dirname,'../views');

app.set('views',viewsPath);
app.use(express.static('public'));


app.use('/api',mainRouter);

export default app;