import { Router } from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
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

const router = Router();
router.use(cookieParser());
router.use(session(StoreOptions));


const users = [
    {
        username: 'admin',
        email: 'admin@gmail.com',
        password:'admin',
        admin: true,
    },
];

router.get('/',(req,res)=> {
    const info = {
        loggedIn: false
    }
    if(req.session.info?.loggedIn){
        info.loggedIn = true;
        info.username = req.session.info.username;
        if(req.session.info.admin){
            info.admin = true;
            info.users = users;
        }
    
    }
    console.log(req.session)
    res.render('index', {info})
})

router.post('/login',(req,res)=>{
    console.log(req.body);
    const indice = users.findIndex(element => element.username == req.body.username);
    if(indice < 0){
        return res.redirect('/api');
    }
    if(!users[indice].password == req.body.password){
        return res.redirect('/api');
    }
    req.session.info = {
        loggedIn: true,
        contador: 1,
        username: users[indice].username,
        admin: users[indice].admin,
    }
    console.log(req.session)
    res.redirect('/api');
});

router.post('/register',(req,res)=>{
    console.log(req.body);
    const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        admin: false,
    }
    users.push(newUser);
    console.log(users)
    res.redirect('/api');
});

router.post('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/api')
})


export default router;